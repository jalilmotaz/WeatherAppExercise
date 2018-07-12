var myApp = angular.module('weatherApp', ['ionic']);

myApp.run(function ($rootScope, $compile, $ionicPopup) {

    $rootScope.LoadPage = function (html) {
        $("#pageLoad").empty().append($compile(html)($rootScope));
    }
    //initial launch load home page
    $rootScope.LoadPage('<home/>');


    $rootScope.Alert = function (title, msg) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: msg
        });
    }
})



//factory to get page model
myApp.factory('WeatherFactory', function ($http, $rootScope) {

    this.GetWeatherFromZipCode = function (zipcode) {
        url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + '&&APPID=86c6a3fc83930516e64a3f9bbe8dbdc1';

        return $http.get(url).then(function (response) {

                   $rootScope.loading = false;
                //   $rootScope.Alert("worked","Request completed successfully");
                   console.log(response);
                   $rootScope.LoadPage('<weather/>');
                   return response.data;
               }, function errorCallback(response) {

                   $rootScope.Alert("Something went wrong","Failed to complete request");
               });
    };


    return this;
});


