myApp.directive('home', function ($rootScope, WeatherFactory) {
    return {
        templateUrl: 'directives/partials/_home.html',
        scope: {},
        link: function (scope) {

            //scope function if user types in their zipcode
            scope.SubmitZipCode = function (zipcode) {

                if (zipcode == undefined || zipcode == '') {
                    $rootScope.Alert("Invalid zip code", "Please enter a valid USA zip code");
                    return;
                }
                //hard coded US for now but there is support for other countries 
                if (!IsValidPostalCode(zipcode, 'US')) {
                    $rootScope.Alert("Invalid zip code", "Please enter a valid USA zip code");
                    return;
                }

                WeatherFactory.GetWeatherFromZipCode(zipcode); // Call factory to display weather results
            }

            function IsValidPostalCode(postalCode, countryCode) { // private function to verify a zipcode by their country code.
                switch (countryCode) {
                    case "US":
                        postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
                        break;
                    case "CA":
                        postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
                        break;
                    default:
                        postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
                }

                return postalCodeRegex.test(postalCode);
            }

        }
    };
});
