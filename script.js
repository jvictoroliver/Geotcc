var map;
var markers = [];

document.getElementById('clearMarkers').addEventListener('click', function() {
    clearMarkers();
});

function addMarker(latitude, longitude, popupText, color, markerId) {
    var marker = L.marker([latitude, longitude], { icon: createMarkerIcon(color) }).addTo(map)
        .bindPopup(popupText).openPopup();
    marker.markerId = markerId; // Adiciona um ID ao marcador
    markers.push(marker);

    // Adiciona um evento de clique ao marcador para removê-lo quando clicado
    marker.on('click', function() {
        removeMarker(marker);
    });
}

function removeMarker(marker) {
    // Verifica se o marcador tem um ID e não o remove
    if (marker.markerId !== 'euEstouAqui') {
        map.removeLayer(marker);

        // Remove o marcador do array de marcadores
        var index = markers.indexOf(marker);
        if (index !== -1) {
            markers.splice(index, 1);
        }
    }
}

function clearMarkers() {
    markers.forEach(function(marker) {
        // Verifica se o marcador tem um ID e não o remove
        if (marker.markerId !== 'euEstouAqui') {
            map.removeLayer(marker);
        }
    });
    markers = [];

    // Adiciona a marcação "Eu estou aqui!" novamente após excluir os marcadores
    var pos = watchID.getLastPosition();
    if (pos) {
        addMarker(pos.coords.latitude, pos.coords.longitude, 'Eu estou aqui!', 'blue', 'euEstouAqui');
    }
}

function createMarkerIcon(color) {
    return L.divIcon({
        className: 'custom-marker',
        iconSize: [24, 24],
        html: '<div style="background-color: ' + color + ';" class="marker"></div>'
    });
}

function success(pos) {
    if (map === undefined) {
        map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        
        map.on('click', function(event) {
            var latitude = event.latlng.lat;
            var longitude = event.latlng.lng;
            addMarker(latitude, longitude, 'Cuidado tem um buraco aqui!', 'red');
        });

        
        addMarker(pos.coords.latitude, pos.coords.longitude, 'Eu estou aqui!', 'blue', 'euEstouAqui');
    } else {
        map.setView([pos.coords.latitude, pos.coords.longitude], 13);
    }
}

function error(err) {
    console.log(err);
}

var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});
