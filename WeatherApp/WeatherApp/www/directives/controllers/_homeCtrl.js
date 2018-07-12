myApp.directive('home', function () {
    return {
        templateUrl: 'directives/partials/_home.html',

    };
});

myApp.controller("homeCtrl", function ($rootScope, $scope, WeatherFactory) {

    $scope.SubmitZipCode = function (zipcode) {
        if (zipcode == undefined || zipcode == '') {

            $rootScope.Alert("Form Error", "Zip code field must not be empty");
        }
        else {
            WeatherFactory.GetWeatherFromZipCode(zipcode);
        }
    }
});