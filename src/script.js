var sckqn8 = angular.module('sckqn8', ['ngRoute']);

sckqn8.config(function($routeProvider){
   $routeProvider
   .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homePage'
   })
   
   .when('/userRegistration', {
       templateUrl: 'pages/userregistration.html',
       controller: 'registerController'
   })
   
   .when('/login', {
       templateUrl: 'pages/weather.html',
       controller: 'taskController'
   })
});


sckqn8.controller('homePage', function($scope){
    //
});

sckqn8.controller('registerController', function($scope){
    
    $scope.saveuser = function() {
    var newuser = {};
	newuser.username = document.getElementById("username").value;
	newuser.password = document.getElementById("password").value;
	newuser.fullname = document.getElementById("name").value;
	newuser.git = document.getElementById("git").value;
	
	localStorage.newuser = JSON.stringify(newuser); 
	alert(localStorage.newuser);
  }
});

sckqn8.controller('taskController', function($scope, $http){
    var map;
    var mapOptions;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true
    });
    var directionsService = new google.maps.DirectionsService();

    var init = function () {
          var pos = new google.maps.LatLng(0, 0); 
          var mapOptions = {
                zoom: 3,
                center: pos
            };

            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
     };
    init();
    
    
    var source = "";
    var destination = "";
    
    $scope.getInformation = function () {
            
        source = document.getElementById('source').value;
        destination = document.getElementById('destination').value;
            var request = {
                origin: source,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);
                }
                
                $scope.getWeatherInformation();
           
        });
           
    };
    
    $scope.getWeatherInformation = function() {
        $http.get('http://api.openweathermap.org/data/2.5/weather?q='+source+'&APPID=b412dce1ca97bef95a221c333ac34454').success(function(response) {
            var sourceFarenheit = (response.main.temp - 273.15) * 1.8 + 32;
            sourceFarenheit = Math.round(sourceFarenheit);
            angular.element(document.querySelector('#sourceWeather')).html(sourceFarenheit+"&deg; F.");
            
        });  
        
        $http.get('http://api.openweathermap.org/data/2.5/weather?q='+destination+'&APPID=b412dce1ca97bef95a221c333ac34454').success(function(response) {
            var destinationFarenheit = (response.main.temp - 273.15) * 1.8 + 32;
            destinationFarenheit = Math.round(destinationFarenheit);
            angular.element(document.querySelector('#destinationWeather')).html(destinationFarenheit+"&deg; F.");
            
        });  
    }
});