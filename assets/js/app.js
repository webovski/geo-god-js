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
        color: '#27a6e6',
        fillColor: 'rgba(39,166,230,0.54)',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(customMap);
    markersArray.push(circleMarker)
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