var coordinatesVisible = false;
var h2 = document.querySelector('h2');

document.getElementById('toggleCoordinates').addEventListener('click', function() {
    coordinatesVisible = !coordinatesVisible;
    updateCoordinatesVisibility();
});

function updateCoordinatesVisibility() {
    h2.style.display = coordinatesVisible ? 'block' : 'none';
}

var map;

function success(pos){
    if (map === undefined) {
        map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    } else {
        map.setView([pos.coords.latitude, pos.coords.longitude], 13);
    }

    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
        .bindPopup('Eu estou aqui!')
        .openPopup();
}

function error(err){
    console.log(err);
}

var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});

// Inicialmente, ocultar as coordenadas
updateCoordinatesVisibility();