const map = L.map('map',
{
    center: [-29.50, 145],
    zoom: 3.5
    
});


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



fetch('/javascripts/GeoJSON.json')
.then(function(response) {
return response.json();
})
.then(function(geojson){
    for(var i=0;i<geojson.features.length;i++){
    console.log(geojson.features[i]);
    var feature=geojson.features[i];
    var coordinates=feature.geometry.coordinates;
    var lat = coordinates[1];
    var long = coordinates[0];
    var name = feature.properties.name;

    var marker = L.marker([lat, long]);
    marker.bindPopup(name).openPopup()
    marker.addTo(map);
    
    }
})
.catch(function(error){
    console.log('Error',error);
})
