     
// map erstellen 
var map= L.map('Karte').setView([48.19722537806256, 16.37015461921692], 13);


 // basemaps

 var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
     attribution:'©<ahref="http://osm.org/copyright">OpenStreetMap</a>contributors' }
 ).addTo(map);

 var osm_bw = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
                 attribution: '©<ahref="http://osm.org/copyright">OpenStreetMap</a> contributors' }
 ).addTo(map); 

 var baseMaps = {
     "Open Street Map":osm,
     "OSM grau":osm_bw
 };

 // marker

 var ownicon = L.icon({
     iconUrl: 'img/icon.png',
     iconSize: [50,50],
     iconAnchor:[0,0],
     popupAnchor:  [-3, -76]
 });
        
 var marker1 = L.marker([48.21798199057435,16.37907028198242], {icon: ownicon}).bindPopup('<b>Art des Problems</b><br>Gehweg zugeparkt');
 var marker2 = L.marker([48.17791446461507,16.33581429719925]).bindPopup('<b>Art des Problems</b><br>Gehsteig zu schmal');
 var marker3 = L.marker([48.17813445579481,16.38831853866577]).bindPopup('<b>Art des Problems</b><br>Katastrophe');
 var marker4 = L.marker([48.21008,16.35203]).bindPopup('<b>Art des Problems</b><br>Objekt am Gehsteig <img src="img/gehsteig1.jpg" style="width:75%;">');

 
 var places = L.layerGroup([marker1,marker2,marker3,marker4]).addTo(map);


 // stand alone Pop-up (z.B. für Anleitung)
 var popup = L.popup()
     .setLatLng([48.2,16.33])
     .setContent("Klicke auf die Marker um die <br> Art des Problems zu erfahren")
     .openOn(map);


 // GeoJSON Layer einfügen 
 var myGeoJsonLayer = L.geoJSON().addTo(map);

 $.getJSON('data/bereiche.geojson',function(result){
     myGeoJsonLayer.addData(result);
     myGeoJsonLayer.setStyle((feature)=>geoJsonStyle(feature))
     });

 function geoJsonStyle(feature) {
     switch (feature.properties.category) {
         case 'fuzo': return {color: "#ff6347"}
         case 'gehsteig_breit': return {color: "#6e990f", weight: "8"}
         case 'gehsteig_schmal': return {color: "#e0bd0f"}
         }
     };

// GeoJSON-Layer für Fußgänger- und Begegnungszonen (Layer "Zoneninfo")
var Zoneninfo = L.geoJSON().addTo(map);

// Begegnungszonen
$.getJSON('data/begegnungszonen.geojson',function(result){
         Zoneninfo.addData(result);
                });   

// Fußgängerzonen
$.getJSON('data/fussgaengerzone.geojson',function(result){
    Zoneninfo.addData(result);
           });   

// GeoJSOn Layer für Wohnstraßen
var wohnstrassen = L.geoJSON().addTo(map)
$.getJSON('data/wohnstrassen.geojson',function(result){
    wohnstrassen.addData(result)
        });

                
// Problemstellen        
var Problemstellen = L.geoJSON().addTo(map);
$.getJSON('data/problemstelle.geojson',function(result){
    Begegnungszonen.addData(result);
           });   




 // Layer Control

 var layermap = {
    "Wohnstrassen" : wohnstrassen,
    "Begegnungs- und Fußgängerzonen": Zoneninfo,
    "Problemstellen": Problemstellen
     };

 L.control.layers(baseMaps,layermap).addTo(map);


