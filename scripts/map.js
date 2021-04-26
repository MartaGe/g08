<script>
var map= L.map('karte1').setView([48.19722537806256, 16.37015461921692], 15);

 // basemaps

 var OSM_norm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        {attribution:'©<ahref="http://osm.org/copyright">OpenStreetMap</a>contributors'});

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });

var baseMaps = {
    "Open Street Map":OSM_norm,
    "OpenTopoMap": OpenTopoMap
};

// Marker inkl. Gruppierung - irgendwas funktioniert noch nicht
var mark1 = L.marker([48.2,16.37]).bindPopup(`PROBLEM1`);

var mark2 = L.marker([48.22,16.38]).bindPopup(`PROBLEM2`);

var places = L.layerGroup(mark1,mark2);

// GeoJSON Layer

var myGeoJsonLayer= L.geoJSON().addTo(map);
$.getJSON('data/linie.geojson',function(result){
        myGeoJsonLayer.addData(result);
        myGeoJsonLayer.bindPopup('Wichtiger Weg');
        myGeoJsonLayer.bindTooltip('Das ist Tooltip');
    });



// layer Ordnung und so

var overlayMaps = {
    "Orte": places,
    "Route": myGeoJsonLayer
};

L.control.layers(baseMaps,overlayMaps).addTo(map);

</script> 

