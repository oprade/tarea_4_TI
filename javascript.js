
//create map
var map;
var dict_airports={};


function initMap() {
    var myLatLng = {lat: -33.447487, lng: -70.673676};// Santiago de Chile

      
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
    });
    




    function addPoint(description, latlng, image) {            
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latlng.lat, latlng.lng),
            icon : image,
            map: map,
            title: description
        
        }); 
        return marker   

    };


    //create the marker of an airport
    function new_Airports(data) {
        var image = "airport.png";
        marker_airport = addPoint(data["name"],{lat: data["airport_position"][0],
        lng: data["airport_position"][1]},image);
        

        
    }; 

    //connection with the server
    var socket = io.connect('wss://integracion-tarea-4.herokuapp.com', {"path": "/flights"});

    //obtain info form imports and create the markers
    socket.on('AIRPORTS', function(data){
        var airports=Object.keys(data);
        for (var key in airports){
            var airport = data[airports[key]];
            dict_airports[airport.airport_code]=airport;
            var new_airport = new_Airports(airport);

            /*//add pop up info window //do not work
            var contentString = 'test';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            marker.addListener('click', function() {
                infowindow.open(map, new_airport);
            });*/
        }
    });   

    socket.emit('AIRPORTS',function(data){});



    //Create flights

    //create line between 2 airports 
    function new_line(data,map){
        for (var key in data){
          var flight = data[key];
          var origin = flight.origin;
          var destination = flight.destination;
          var path  = [
            {lat: destination.airport_position[0], lng: destination.airport_position[1]},
            {lat: origin.airport_position[0], lng: origin.airport_position[1]}
          ];
          var flightPath = new google.maps.Polyline({
            path: path,
          });
          flightPath.setMap(map);
          
    }};

    socket.on('FLIGHTS', function(data){
        new_line(data,map)
    });

    socket.emit('FLIGHTS',function(data){});

    //add planes
    //this function does not work, i could not identify why
   /* function new_plane(description, latlng){
        var image = "airport.png";
        var plane = addPoint(description, latlng, image);
        
       //var infoWindow = new google.maps.InfoWindow({content:"test"});
        //avion.addListener('mouseover', function(){infoWindow.open(map, plane)});
        //avion.addListener('mouseout', function() {infoWindow.close()});
        
        return plane;
    };*/

    //add planes on the map, but does not enable the live-update of positions
    socket.on('POSITION',function(data){
        //for (var key in data){ //I don't understand the format of position but it seems that loops are useless
            //var plane = data [key];
            var plane =data;
            var name_plane = plane.code;
            var latlng = {lat: plane.position[0], lng: plane.position[1]};
            var image = "airplane.png";

            addPoint(name_plane, latlng, image);
        //}
    });
    socket.emit('POSITION',function(data){});

};