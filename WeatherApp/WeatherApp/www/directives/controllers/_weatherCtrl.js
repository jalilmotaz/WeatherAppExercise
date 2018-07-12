myApp.directive('weather', function () {
    return {
        templateUrl: 'directives/partials/_weather.html',
    };
});

myApp.controller("weatherCtrl", function ($rootScope, $scope, WeatherFactory) {

  
});