
//create map
var map;
var dict_airports={};

function initMap() {
    var myLatLng = {lat: -33.447487, lng: -70.673676};// Santiago de Chile

      
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
    });
    




function addPoint(description, latlng) {            
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latlng.lat, latlng.lng),
        map: map,
        title: description
        
    }); 
    return marker   

};


//create the marker of an airport
function new_Airports(data) {
        marker_airport = addPoint(data["name"],{lat: data["airport_position"][0],
        lng: data["airport_position"][1]});
        return marker_airport
}; 

//connection with the server
var socket = io.connect('wss://integracion-tarea-4.herokuapp.com', {"path": "/flights"});

//obtain info form imports and create the markers
socket.on('AIRPORTS', function(data){
    var airports=Object.keys(data);
    for (var key in airports){
      var airport = data[airports[key]];
      dict_airports[airport.airport_code]=airport;
      new_Airports(airport);
    }
});   

socket.emit('AIRPORTS',function(data){});

};