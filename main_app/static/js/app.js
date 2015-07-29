(function(){
    var mainApp = angular.module('mainApp', ["infinite-scroll"]);

    mainApp.config([
        "$httpProvider", function($httpProvider) {
            $httpProvider.defaults.xsrfCookieName = "csrftoken";
            $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
        }
        
    ]);

}());

