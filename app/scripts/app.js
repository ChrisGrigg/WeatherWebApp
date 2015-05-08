/**
* Created by Christopher Grigg 04/01/2015
*/

//var CHRISG = CHRISG || {};

(function ()
{
  'use strict';
  
  var app = angular.module('site', []);
  var citiesArray = []; // holds information for list, to loop through
//  var weatherData = [];
  
  app.service('CitiesService', function() {
    //to create unique contact id
    var uid = 1;
    var cities = [];
    var savedCities;
    
    savedCities = localStorage.getItem('cities');
	  cities = (localStorage.getItem('cities')!==null) ? JSON.parse(savedCities) : ['Brisbane'];
    localStorage.setItem('cities', JSON.stringify(cities));

    this.save = function(field) {
      cities.push(field.city);
      field.city = ''; //clear the input after adding
      localStorage.setItem('cities', JSON.stringify(cities));
    };
    
    //simply returns the contacts list
    this.list = function () {
        return cities;
    }
  });
  
  app.service('WeatherService', function(){
    var weatherList = [];
    
    this.addCity = function(city) {
      weatherList.push(city);
    }
    
    this.list = function() {
      return weatherList;
    }
  });
  
  app.controller('WeatherAppCtrl', ['$scope', '$http', 'WeatherService', function($scope, $http, WeatherService)
  {
      var citiesList = JSON.parse(localStorage.getItem('cities'));
    
      for (var i=0; i<citiesList.length; i++) {
        $http.get('http://api.openweathermap.org/data/2.5/weather?q='+citiesList[i])
            .success(function(data)
            {
                WeatherService.addCity(data);
            })
            .error(function()
            {
                alert('error loading weatherAppCtrl json');
            });
      };
    
      $scope.weatherList = WeatherService.list();
  }]);
  
  app.controller('CitiesController', function ($scope, CitiesService) {

    $scope.cities = CitiesService.list();

    $scope.saveCity = function () {
        CitiesService.save($scope.field);
        $scope.field = {};
    }

//    $scope.delete = function (id) {
//        CitiesService.delete(id);
//        if ($scope.field.id == id) $scope.field = {};
//    }
//
//    $scope.edit = function (id) {
//        $scope.field = angular.copy(CitiesService.get(id));
//    }
  });
})();
