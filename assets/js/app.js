let theme = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

let lat = 46.68664732483417;
let lon = 32.54464706119928;

let customMap = null;
let popup = L.popup();
let markersArray = []

function initMap() {
    customMap = L.map('map').setView([lat, lon], 13);
    L.tileLayer(theme, {
        minZoom: 1, maxZoom: 20
    }).addTo(customMap);
    customMap.on('click', setPoint);

}

function setPoint(e) {
    popup.setLatLng(e.latlng)
    let marker = L.marker(e.latlng).addTo(customMap)
    markersArray.push(marker)
}

function clearPoints() {
    for (let markerItem of markersArray) {
        customMap.removeLayer(markerItem)
    }
    markersArray = []
}

function startParsing() {
    alert(`Всего точек: ${markersArray.length}`)
    clearPoints()
}

$(document).ready(function () {
    initMap();
});