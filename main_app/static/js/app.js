(function(){
    var mainApp = angular.module('mainApp', [
        "infinite-scroll",
        "mainApp.directives.expandReview"
    ]);

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
                    //console.log('in scroll');
                    //console.log('scrollLeft ' + raw.scrollLeft);
                    //console.log('offsetWidth ' + raw.offsetWidth);
                    //console.log('scrollWidth' + raw.scrollWidth);
                    console.log(element);

                    if (raw.scrollLeft + raw.offsetWidth >= raw.scrollWidth) {
                        console.log('applying');
                        scope.$apply(attrs.scrolly);
                    }
                });
            }
        };
    });

    angular.module('mainApp.directives.expandReview', [])
        .directive('expandReview', function(){
                console.log("WHAT");

        return {
            restrict: 'E',
            link: function(scope, element, attrs){
                //console.log("loading expand-review");
                //console.log(arguments);

                element.bind('mouseenter', function(){
                    var h = element[0].childNodes[1].clientHeight + 60;
                    var h_str = h.toString() + "px";
                    if(h>100){
                        element.parent().parent().parent().css("height", h_str);
                    }

                });
            }
        };
    });

}());

