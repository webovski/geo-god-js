let theme = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

let lat = 46.68664732483417;
let lon = 32.54464706119928;

let customMap = null;
let markersArray = []

function initMap() {
    customMap = L.map('map').setView([lat, lon], 13);
    L.tileLayer(theme, {
        minZoom: 1, maxZoom: 20
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

    if (markersCount > 0) {
        Swal.fire({
            title: `Выбрано ${markersCount} точек. Вы действительно хотите запустить сбор? Данная операция необратима!`,
            showDenyButton: true,
            confirmButtonText: 'Запустить',
            denyButtonText: `Отмена`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Сбор запущен!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Действие отменено!', '', 'info')
            }
        })
        clearPoints(false)
    } else {
        Swal.fire('Вы не выбрали точки!', '', 'info')
    }
}

$(document).ready(function () {
    initMap();
});