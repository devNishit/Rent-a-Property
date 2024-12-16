console.log(listingData.geoData.coordinates[1]);
// Where you want to render the map.
var element = document.getElementById('map');

// Create Leaflet map on map element.
var map = L.map(element);

// Add OSM tile layer to the Leaflet map.
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Target's GPS coordinates.
var target = L.latLng(`${listingData.geoData.coordinates[1]}`,`${listingData.geoData.coordinates[0]}`);

// Set map's center to target with zoom 14.
map.setView(target, 12);

// Place a marker on the same location.
L.marker(target).addTo(map)
.bindPopup(`<p class="title">${listingData.title}</p> Exact location of the listing.`);

