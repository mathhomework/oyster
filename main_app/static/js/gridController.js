(function(){
    var gridFactory = function($http, $q){
        var factory = {};
        var url = "http://127.0.0.1:8000/";

        factory.test = function(id){
            return $http.get("http://127.0.0.1:8000/api/reviews/" + id);
        };

        factory.test2 = function(id){
            var deferred = $q.defer();
            $http.get("http://127.0.0.1:8000/api/reviews/" + id)
                .then(function(result) {
                    deferred.resolve(result);
                    //if you don't make deferred obj, then just remove the deferred.promise and
                    //return result;
                })
                .catch(function(error){
                    //return $q.reject("data not working brah"); if no deferred.
                    deferred.reject('REJECTED');
                });
            return deferred.promise;
        };

        factory.getReviews = function(query){
            var deferred = $q.defer();
            $http.get(url + "api/reviews/" + query)
                .then(function(result) {
                    deferred.resolve(result);
                })
                .catch(function(error){
                    deferred.reject('REJECTED');
                });

            return deferred.promise;

        };


        return factory;
    };

    gridFactory.$inject = ['$http', '$q'];
    angular.module('mainApp').factory('gridFactory', gridFactory);
}());

(function(){

    var gridController = function($scope, $http, gridFactory){
        console.log("gridController ONLINE");

        $scope.query = "";

        $scope.word = "HUZZAH!";
        $scope.voteUp = function(){
            $scope.word = "VOTEDUP";

        };
        gridFactory.test(1)
            .then(function(response){
                console.log(response.data);
            }, function(error){
                console.log("didn't work" + error);
            });

        gridFactory.test2(1)
            .then(function(stuff){
                console.log(stuff.data);
            });
        $scope.oldReviews = false;
        $scope.newReviews = false;
        $scope.popularReviews = false;
        $scope.setOldReviews = function(){
            $scope.oldReviews = true;
            $scope.newReviews = false;
            $scope.popularReviews = false;
        };
        $scope.setNewReviews = function(){
            $scope.oldReviews = false;
            $scope.newReviews = true;
            $scope.popularReviews = false;
            console.log("setNewReviews triggered");
            $scope.getInitialReviews();
        };
        $scope.setPopularReviews = function(){
            $scope.oldReviews = false;
            $scope.newReviews = false;
            $scope.popularReviews = true;
        };
        function setQuery(){
            var query = "?";
            if($scope.oldReviews == true){
                query += "ordering=modified";
            }else if($scope.newReviews==true){
                query += "ordering=-modified";
            }else if($scope.popularReviews==true){
                query += "";
            }

            return query;
        }

        $scope.getNextReviews = function(){

        };
        $scope.getInitialReviews = function(){
            var q = setQuery();
            q += "&limit=3";
            console.log("QUERY IS:" + q);
            gridFactory.getReviews(q)
                .then(function(reviewsParent){
                    var reviews = reviewsParent.data.results;

                    for(var i = 0; i<reviews.length(); i++){
                        reviews[i].
                    }
                    console.log(JSON.stringify(reviewsParent));
                });

        }

    };
    gridController.$inject = ['$scope', '$http', 'gridFactory'];
    angular.module('mainApp').controller('gridController', gridController)
}());

