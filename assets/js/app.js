    let theme = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let lat = 45.757583;
    let lon = 24.561138;
    let macarte = null;
    let markerClusters;
    let popup = L.popup();

    function initMap() {

        macarte = L.map('map').setView([lat, lon], 5);
        markerClusters = L.markerClusterGroup;
        L.tileLayer(theme, {
            minZoom: 1,
            maxZoom: 20
        }).addTo(macarte);
        macarte.on('click', onMapClick);
    }

    function onMapClick(e) {
        let latitude = e.latlng.lat
        let longitude = e.latlng.lng
        popup
            .setLatLng(e.latlng)
            .setContent(`${latitude} </br>${longitude}`)
            .openOn(macarte);
        let marker = L.marker(e.latlng).addTo(macarte)
    }

    $(document).ready(function () {
        initMap();
    });