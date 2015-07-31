(function(){
    var mainApp = angular.module('mainApp', ["infinite-scroll"]);

    mainApp.config([
        "$httpProvider", function($httpProvider) {
            $httpProvider.defaults.xsrfCookieName = "csrftoken";
            $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
        }
        
    ]);


    mainApp.directive('scrolly', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
            console.log('loading directive');

            element.bind('scroll', function () {
                console.log('in scroll');
                //console.log('scrollLeft ' + raw.scrollLeft);
                //console.log('offsetWidth ' + raw.offsetWidth);
                //console.log('scrollWidth' + raw.scrollWidth);
                //console.log(element);

                if (raw.scrollLeft + raw.offsetWidth > raw.scrollWidth - raw.clientWidth) {
                    console.log('applying');
                    scope.$apply(attrs.scrolly);
                }
            });
        }
    };
});

}());

