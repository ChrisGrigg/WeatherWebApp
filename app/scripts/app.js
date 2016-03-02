(function ()
{
  'use strict';

  angular.module('app', [])

  .service('CitiesService', function () {
    //to create unique city id
    var uid = 1;

    //cities array to hold list of all cities
    var cities = [{
        id: 0,
        'name': 'Brisbane'
    }];

    //save method create a new city if not already exists
    //else update the existing object
    this.save = function (city, data) {

        // format and simplify data for city
        city.weatherDesc = data.weather[0].description;
        city.temperature = Math.round(data.main.temp - 273.15); // Temperature is in Kelvin so requires formula to conert to Celcius
        city.windSpeed = data.wind.speed; // append wind speed format

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
  })

  .controller('CityController', ['$scope', '$http', 'CitiesService', function ($scope, $http, CitiesService) {
    // acting as const
    var URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
	var APPID = "&APPID=4fc1c3b55b2c1e1fcaa65ae67e2841ca";

    $scope.cities = CitiesService.list(); // get full list of cities

    $scope.newCity = $scope.cities[0]; // start off with Brisbane and its weather data as default

    $scope.saveCity = function () {
      // first get all weather data relating to city
      $http.get(URL + $scope.newCity.name + APPID)
            .success(function(data)
            {
                // if there is no error message
                if(!data.message) {
                  CitiesService.save($scope.newCity, data); // pass all city and weather data to be saved to city Array
                  $scope.newCity = {}; // reset object
                  $scope.orderProp = '-id'; // order by id so newest entry is at top of list
                } else {
                  // create error pop up and make field blank
                  alert('Error loading country data, please try again.');
                  $scope.newCity = '';
                }
            })
            .error(function()
            {
                // create error pop up and make field blank
                alert('Error loading country data, please try again.');
                $scope.newCity = '';
            });
    }

    $scope.saveCity(); // invoke save City on init to save Brisbane weather data

    // delete current item in list
    $scope.delete = function (id) {
        CitiesService.delete(id);
        if ($scope.newCity.id == id) $scope.newCity = {};
    }

    // order the Angular list by any field listed below
    // 0 = name
    // 1 = weatherDesc
    // 2 = temperature
    // 3 = windSpeed
    //
    $scope.orderBy = function(value) {
      if(value === 0) {
        $scope.orderProp = 'name';
      }else if(value === 1) {
        $scope.orderProp = 'weatherDesc';
      }else if(value === 2) {
        $scope.orderProp = 'temperature';
      }else if(value === 3) {
        $scope.orderProp = 'windSpeed';
      }
    }


  }]);

})();
