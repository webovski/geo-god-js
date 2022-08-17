let theme = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let lat = 46.68664732483417;
let lon = 32.54464706119928;


let customMap = null;
let markerClusters;
let popup = L.popup();

function initMap() {

    customMap = L.map('map').setView([lat, lon], 13);
    markerClusters = L.markerClusterGroup;
    L.tileLayer(theme, {
        minZoom: 1, maxZoom: 20
    }).addTo(customMap);
    customMap.on('click', onMapClick);
}

function onMapClick(e) {
    let latitude = e.latlng.lat
    let longitude = e.latlng.lng
    popup
        .setLatLng(e.latlng)
        .setContent(`${latitude} </br>${longitude}`)
        .openOn(customMap);

    let marker = L.marker(e.latlng).addTo(customMap)
}

$(document).ready(function () {
    initMap();
});