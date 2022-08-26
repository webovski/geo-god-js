let theme = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

let lat = 46.68664732483417;
let lon = 32.54464706119928;

let customMap = null;
let markersArray = []

function initMap() {
    customMap = L.map('map').setView([lat, lon], 13);
    L.tileLayer(theme, {
        attribution: '<a target="_blank" href="https://t.me/+kvN-HqcjRfVhY2U8">GeoGod</a> | <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(customMap);
    customMap.on('click', setPoint);

}

function setPoint(e) {
    let circleMarker = L.circle([e.latlng.lat, e.latlng.lng], {
        color: '#27a6e6', fillColor: 'rgba(39,166,230,0.54)', fillOpacity: 0.5, radius: 500
    }).addTo(customMap);
    markersArray.push(circleMarker)
}

function clearPoints(showAlert = true) {
    if (showAlert) {
        Swal.fire('Точки успешно очищены!', '', 'info')
    }

    for (let markerItem of markersArray) {
        customMap.removeLayer(markerItem)
    }
    markersArray = []
}

function startParsing() {
    let markersCount = markersArray.length
    let userFrontEndBalance = parseFloat(document.getElementById('balance-in-dollars').innerText.substring(1))

    if (markersCount > 0) {
        if (userFrontEndBalance > 0) {
            Swal.fire({
                title: `Выбрано ${markersCount} точек. Вы действительно хотите запустить сбор? Данная операция необратима!`,
                confirmButtonText: 'Запустить',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return callParsingApi(markersArray)
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (!result.isConfirmed) {
                    Swal.fire('Действие отменено!', '', 'error')
                } else {
                    Swal.fire('Сбор запущен!', '', 'success')
                    freezeParsingButton()
                    clearPoints(false)
                }
            })
        } else {
            Swal.fire('Пополните баланс!', '', 'error')
        }
    } else {
        Swal.fire('Вы не выбрали точки!', '', 'info')
    }
}

function callParsingApi(markersArray) {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessKey = urlParams.get('key')
    let markersForRequest = []

    for (let markerItemForRequest of markersArray) {
        let latForRequest = markerItemForRequest._latlng.lat
        let lonForRequest = markerItemForRequest._latlng.lng
        markersForRequest.push([latForRequest, lonForRequest])
    }

    let requestBody = {
        route: 'parse', access_key: accessKey, markers: markersForRequest
    };

    let apiResponse = $.ajax({
        type: "POST",
        url: "https://script.google.com/macros/s/AKfycbzyc-Xff4WdfX6wpkXAfiPNjRT06x_HMdfuKza8Q1-qysGNw3iFazf5723QRqHccYzG/exec",
        traditional: true,
        redirect: "follow",
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        async: false,
        data: JSON.stringify(requestBody)
    });

    return apiResponse.responseJSON.state
}

$(document).ready(function () {
    initMap();
});