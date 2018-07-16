var myApp = angular.module('weatherApp', ['ionic']);

myApp.run(function ($rootScope, $compile, $ionicPopup, WeatherFactory,$http) {

    $rootScope.LoadPage = function (html) {
        //function to load directives to view and compile angularJS code
        $("#pageLoad").empty().append($compile(html)($rootScope));
    }

    //initial launch load home page
    $rootScope.LoadPage('<home/>');

    $rootScope.Alert = function (title, msg) { // simple ionic alert message can be called from anyw controller
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: msg
        });
    }

    $rootScope.ShareLocation = function () { // get location of user and submit it to get weather results

        
        // onSuccess Callback
        // This method accepts a Position object, which contains the current GPS coordinates
        var onSuccess = function (position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;

                    var getZipCode = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng;

                    $http.get(getZipCode).then(function (response) {

                      
                        var zipCode ="";
                        for (var i = 0; i < response.data.results[0].address_components.length; i++) {
                            var tempAddr = response.data.results[0].address_components[i];
                            if (tempAddr.types == 'postal_code') {
                                zipCode = tempAddr.short_name;
                                break;
                            }
                        }
                        
                        WeatherFactory.GetWeatherFromZipCode(zipCode);
                    });

        };

        // onError Callback 
        //receives a PositionError object
        function onError(error) {
            $rootScope.Alert('Oops an error occured','code: ' + error.code + '\n' +
                  'message: ' + error.message + '\n');
        }

        //cordova plugin
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    }

   
})



//factory that gets the weather information 
myApp.factory('WeatherFactory', function ($http, $rootScope) {

    this.GetWeatherFromZipCode = function (zipcode) {
        // function that gets name of city from zipcode using google maps api and then gets the weather information for that city using the openweatherapi

        var getCityName = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode; //goole maps api
        $http.get(getCityName).then(function (response) {
            if (response.data.status == 'ZERO_RESULTS') {
                $rootScope.Alert("Zip code not found", "Please enter a valid USA zip code");
                return;
            }

            var cityName = response.data.results[0].formatted_address;

            var weatherAPIUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName.split(',')[0] + '&&APPID=86c6a3fc83930516e64a3f9bbe8dbdc1&units=imperial&mode=xml';
            //open weather api attaching the cityname

             $http.get(weatherAPIUrl).then(function (response) {
                console.log(response);
               var parser = new DOMParser();
               var xmlWeather = parser.parseFromString(response.data, "text/xml");
               console.log(xmlWeather);

                $rootScope.weatherData = { // rootSope object that has all the information needed for the weather page to read from
                    description:"",
                    mainWeather: xmlWeather.getElementsByTagName("weather")[0].getAttribute("value"),
                    tempHighF: xmlWeather.getElementsByTagName("temperature")[0].getAttribute("max") +"F",
                    tempLowF: xmlWeather.getElementsByTagName("temperature")[0].getAttribute("min") + "F",
                    tempF: xmlWeather.getElementsByTagName("temperature")[0].getAttribute("value"),
                    humidity: xmlWeather.getElementsByTagName("humidity")[0].getAttribute("value") + '%',
                    pressure: xmlWeather.getElementsByTagName("pressure")[0].getAttribute("value") + ' hPa',
                    windSpeedMPH: xmlWeather.getElementsByTagName("speed")[0].getAttribute("value") +" mph",
                    windSpeedMPS: (parseFloat(xmlWeather.getElementsByTagName("speed")[0].getAttribute("value")) * 0.447).toFixed(2) + " m/s",
                    windDirection: xmlWeather.getElementsByTagName("direction")[0].getAttribute("code"),
                    windDescription:xmlWeather.getElementsByTagName("speed")[0].getAttribute("name"),
                    sunrise: GetFormatedTime(xmlWeather.getElementsByTagName("sun")[0].getAttribute("rise")),
                    sunset: GetFormatedTime(xmlWeather.getElementsByTagName("sun")[0].getAttribute("set")),
                    cloudiness:xmlWeather.getElementsByTagName("clouds")[0].getAttribute("name"),
                    city: cityName.split(',')[0] + cityName.split(',')[1]

                };

                var description = $rootScope.weatherData.windDescription + ". High of " + $rootScope.weatherData.tempHighF + ". Winds " + $rootScope.weatherData.windDirection + " at " + $rootScope.weatherData.windSpeedMPH;
                $rootScope.weatherData.description = description; 

                console.log(response.data);
                console.log($rootScope.weatherData);

                 //Load weather page once information is loaded;
                $rootScope.LoadPage("<weather/>");
            }, function errorCallback(response) { 
                if (response.status == 404)
                    $rootScope.Alert("Zip code not found", "Please enter a valid USA zip code");
                else
                    $rootScope.Alert("Sorry, something went wrong", "Please check your internet connection and enter a valid USA zip code");
            });


        }, function errorCallback(response) {
            if (response.status == 404)
                $rootScope.Alert("Zip code not found", "Please enter a valid USA zip code");
            else
                $rootScope.Alert("Sorry, something went wrong", "Please check your internet connection and enter a valid USA zip code");
        });

};



 function GetFormatedTime(time){ 
     return new Date(time).toLocaleTimeString();
     }
    return this;
});


