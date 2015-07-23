(function(){
    var mainApp = angular.module('mainApp', []);

    mainApp.config([
        "$httpProvider", function($httpProvider) {
            $httpProvider.defaults.xsrfCookieName = "csrftoken";
            $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
        }
    ]);

}());

