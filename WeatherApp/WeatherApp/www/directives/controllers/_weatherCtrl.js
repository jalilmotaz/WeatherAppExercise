myApp.directive('weather', function ($rootScope) {
    return {
        templateUrl: 'directives/partials/_weather.html',
        scope: {
           
        }, link: function (scope) {
            //weather scope functions go here. for now this controller only loads the weather template.
        }
    };
});
 