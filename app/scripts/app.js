(function ()
{
  'use strict';
  
  var app = angular.module('app', []);
 
  app.service('CitiesService', function () {
    //to create unique city id
    var uid = 1;
     
    //cities array to hold list of all cities
    var cities = [{
        id: 0,
        'name': 'Brisbane'
    }];
     
    //save method create a new city if not already exists
    //else update the existing object
    this.save = function (city) {
        if (city.id == null) {
            //if this is new city, add it in cities array
            city.id = uid++;
            cities.push(city);
        } else {
            //for existing city, find this city using id
            //and update it.
            for (var i in cities) {
                if (cities[i].id == city.id) {
                    cities[i] = city;
                }
            }
        }
 
    }
 
    //simply search cities list for given id
    //and returns the city object if found
    this.get = function (id) {
        for (var i in cities) {
            if (cities[i].id == id) {
                return cities[i];
            }
        }
 
    }
     
    //iterate through cities list and delete 
    //city if found
    this.delete = function (id) {
        for (var i in cities) {
            if (cities[i].id == id) {
                cities.splice(i, 1);
            }
        }
    }
 
    //simply returns the cities list
    this.list = function () {
        return cities;
    }
  });
 
  app.controller('CityController', ['$scope', '$http', 'CitiesService', function ($scope, $http, CitiesService) {
 
//    $scope.result2 = '';
//    $scope.options2 = {
//      country: 'ca',
//      types: '(cities)'
//    };    
//    $scope.details2 = '';
  
    $scope.cities = CitiesService.list();
  
    $scope.newCity = $scope.cities[0]; // start off with Brisbane and its weather data as default
  
    $scope.saveCity = function () {
      
      $http.get('http://api.openweathermap.org/data/2.5/weather?q='+$scope.newCity.name)
            .success(function(data)
            {
                if(!data.message) {
                  $scope.newCity.weatherDesc = data.weather[0].description;
                  $scope.newCity.temperature = Math.round(data.main.temp - 273.15) + ' C'
                  $scope.newCity.windSpeed = data.wind.speed + ' mps'

                  CitiesService.save($scope.newCity);
                  $scope.newCity = {};
                } else {
                  alert('Error loading country data, please try again.');
                  $scope.newCity = '';
                }
            })
            .error(function()
            {
                alert('Error loading country data, please try again.');
                $scope.newCity = '';
            });
    }
    
    $scope.saveCity(); // invoke save City on init to save Brisbane weather data
 
    $scope.delete = function (id) {
 
        CitiesService.delete(id);
        if ($scope.newCity.id == id) $scope.newCity = {};
    }
  }]);

})();
