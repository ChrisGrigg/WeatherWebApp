(function ()
{
  'use strict';
  var module = angular.module('app', []);
 
module.service('CitiesService', function () {
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
 
module.controller('CityController', ['$scope', '$http', 'CitiesService', function ($scope, $http, CitiesService) {
 
    $scope.cities = CitiesService.list();
 
    $scope.saveCity = function () {
      
      $http.get('http://api.openweathermap.org/data/2.5/weather?q='+$scope.newCity.name)
            .success(function(data)
            {
                $scope.newCity.weather = data;
                CitiesService.save($scope.newCity);
                $scope.newCity = {};
            })
            .error(function()
            {
                alert('error loading weatherAppCtrl json');
            });
    }
 
    $scope.delete = function (id) {
 
        CitiesService.delete(id);
        if ($scope.newCity.id == id) $scope.newCity = {};
    }
}])

})();
