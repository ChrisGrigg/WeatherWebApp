/**
* Created by Christopher Grigg 04/01/2015
*/

//var CHRISG = CHRISG || {};

(function () 
{
  'use strict';
  var app = angular.module('site', []);
  var citiesArray = []; // holds information for list, to loop through
  
  app.controller('CitiesController', ['$scope', '$http', function($scope, $http) {
//      $scope.master = [];
    $scope.saved = localStorage.getItem('cities');
	  $scope.cities = (localStorage.getItem('cities')!==null) ? JSON.parse($scope.saved) : ['Brisbane'];
    localStorage.setItem('cities', JSON.stringify($scope.cities));

      $scope.update = function(field) {
        console.log('cities.json loaded!');
        $scope.cities.push(field.city);
        $scope.todoText = ''; //clear the input after adding
        localStorage.setItem('cities', JSON.stringify($scope.cities));
      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();
  }]);
  
  app.controller('WeatherAppCtrl', ['$http', function($http)
  {
      var weatherAppCtrl = this;
      var citiesList = JSON.parse(localStorage.getItem('cities'));
      console.log('localStorage.getItem[0].city = ' + citiesList[0]);
    
//      for (var i=0; i<citiesList.length; i++) {
        $http.get('http://api.openweathermap.org/data/2.5/weather?q='+citiesList[0])
            .success(function(data)
            {
                console.log('weatherApp.json loaded!')
                weatherAppCtrl.intro = data;
            })
            .error(function()
            {
                alert('error loading weatherAppCtrl json');
            });
//      }
  }]);
  
})();
