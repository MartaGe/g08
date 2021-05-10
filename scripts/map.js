     
// map erstellen 
var map= L.map('Karte').setView([48.19722537806256, 16.37015461921692], 12.2);


 // basemaps

 var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
     attribution:'©<ahref="http://osm.org/copyright">OpenStreetMap</a>contributors' }
 ).addTo(map);

 var osm_bw = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
                 attribution: '©<ahref="http://osm.org/copyright">OpenStreetMap</a> contributors' }
 ).addTo(map); 

 var baseMaps = {
     "Open Street Map":osm,
     "OSM grau":osm_bw,
 };

 // marker

 var ownicon = L.icon({
     iconUrl: 'img/icon.png',
     iconSize: [18,25],
     iconAnchor:[0,0],
     popupAnchor:  [-3, -76]
 });

//  MARKER ALT 
//  var marker1 = L.marker([48.21798199057435,16.37907028198242], {icon: ownicon}).bindPopup('<b>Art des Problems</b><br>Gehweg zugeparkt');
//  var marker2 = L.marker([48.17791446461507,16.33581429719925]).bindPopup('<b>Art des Problems</b><br>Gehsteig zu schmal');
//  var marker3 = L.marker([48.17813445579481,16.38831853866577]).bindPopup('<b>Art des Problems</b><br>Katastrophe');
//  var marker4 = L.marker([48.21008,16.35203]).bindPopup('<b>Art des Problems</b><br>Objekt am Gehsteig <img src="img/gehsteig1.jpg" style="width:75%;">');

 
//  var places = L.layerGroup([marker1,marker2,marker3,marker4]).addTo(map);


// Begegnungszonen
var begegnungszonen = L.geoJSON().addTo(map);
$.getJSON('data/begegnungszonen.geojson',function(result){
         begegnungszonen.addData(result);
         begegnungszonen.setStyle({color:"Orange",opacity:"2"})
                });   

// Fußgängerzonen
var fussgaengerzone = L.geoJSON().addTo(map);
$.getJSON('data/fussgaengerzone.geojson',function(result){
    fussgaengerzone.addData(result);
    fussgaengerzone.setStyle({color:"MediumSeaGreen"})
           });   

// GeoJSOn Layer für Wohnstraßen
var wohnstrassen = L.geoJSON().addTo(map)
$.getJSON('data/wohnstrassen.geojson',function(result){
    wohnstrassen.addData(result);
    wohnstrassen.setStyle({color:"SlateBlue"})
        });

// // Gehsteigbreiten mind. 2m --- ANMERKUNG: Dauert ziemlich lang zum laden

                
// Problemstellen  mit Popups  

var Problemst =  L.geoJSON().addTo(map)
 $.getJSON('data/WOG_Meli.geojson',function(data) {
    L.geoJSON(data, {
        pointToLayer: function(feature,latlng) {
            function problemstellen (feature,layer) {}
            return L.marker(latlng,{icon:ownicon});},

            onEachFeature: function(feature, layer) {
                layer.bindPopup((layer)=>problem_popup(layer))
            }
    }).addTo(map);});


function problem_popup(layer){
        console.log(layer);
        return '<img src="'+ layer.feature.properties.name+'" style="width:302.4px;height:402.2px">'};    
       

 // Layer Control */

 var layermap = {
    "<img src='img/wohnstrasse_legende.PNG' height='20px' /> <span class= 'wohnstrassen'>Wohnstraßen</span>" : wohnstrassen,
    "<img src='img/begegnungszone.PNG' height='20px'/> <span class= 'begegnungszonen'>Begegnungszonen</span>" : begegnungszonen,
    "<img src='img/fussgaengerzone.PNG' height='20px'/> <span class= 'fussgaengerzone'>Fußgängerzonen</span>" : fussgaengerzone,
    "<img src='img/icon.png' height='20px'/> <span class= 'Problemstellen'>Problemstellen</span>" : Problemst,
     };

 L.control.layers(baseMaps,layermap,{
            position: "topright",
            collapsed: false,
            }).addTo(map);



