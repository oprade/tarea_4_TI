
//create map
var map

function initMap() {
    var myLatLng = {lat: -25.363, lng: 131.044};
      
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
    });

}
     



       



/*
//connection with the server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use('/socket.io',
  express.static(__dirname + 'node_modules/socket.io-client/dist/')
)
const socket = io('https://integracion-tarea-4.herokuapp.com', {
  path: '/flights',
  ForceNew = true
});




function initMap() {
  var myLatLng = {lat: -25.363, lng: 131.044};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });
}





//create airports

//obtain airports from the server
socket.emit("AIRPORTS"); //AIRPORTS is a dictionnary
socket.on("AIRPORTS", airport);

function airports(dict){ 
    for(var key in dict) {
        var value = dict[key];
        var marker = new google.maps.Marker({
            position : {lat: value["airport_position"][0],
            lng: value["airport_position"][1]},
            map: map,
            title : value[name]
        })
        
    }
}
*/