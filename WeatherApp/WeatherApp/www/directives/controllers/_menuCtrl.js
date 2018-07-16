myApp.directive('menu', function () {
    return {
        templateUrl: 'directives/partials/_menu.html',
        scope: {

        }, link: function (scope) {
            scope.ToggleMenu = function () { // function to hide and show the hamburger menu.
                var isClosed = $('#menuPanel').css('width') == '0px';
            
                if (isClosed){
                    $('#menuPanel').css('width', '100%');
                    $('#overlay').fadeIn(200);
                }
                else {
                    $('#menuPanel').css('width', '0');
                    $('#overlay').fadeOut(200);
                }
            }
        }
    };
});

