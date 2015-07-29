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

        factory.getReviews = function(query, subject_id){
            var deferred = $q.defer();
            var subject_query = "";
            if(subject_id != ""){
                subject_query= "?subject=" + subject_id.toString();
            }
            $http.get(url + "api/reviews/" + subject_query)
                .then(function(result) {
                    deferred.resolve(result);
                })
                .catch(function(error){
                    deferred.reject('REJECTED');
                });

            return deferred.promise;

        };

        factory.getAllReviews = function(){
            var deferred = $q.defer();
            $http.get(url + "api/reviews/")
                .then(function(result) {
                    deferred.resolve(result);
                })
                .catch(function(error){
                    deferred.reject('REJECTED');
                });

            return deferred.promise;

        };

        factory.getAllSubjects = function(){
            var deferred = $q.defer();
            $http.get(url + "api/subjects/?created=True")
                .then(function(result){
                    deferred.resolve(result);
                })
                .catch(function(error){
                    deferred.reject('REJECTEd');
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
        $scope.filteredSubjects = null;
        console.log("gridController ONLINE");
        $scope.allSubjects = [];
        function populateAllSubjects(){
            gridFactory.getAllSubjects()
                .then(function(subjects){
                    $scope.allSubjects = subjects.data;
                    console.log($scope.allSubjects);

                },
                (function(error){
                    console.log("populateAllSubjects Error:" + error);
                })
            );
        }
        populateAllSubjects();


        //$scope.query = "";
        //
        //gridFactory.test(1)
        //    .then(function(response){
        //        console.log(response.data);
        //    }, function(error){
        //        console.log("didn't work" + error);
        //    });
        //
        //gridFactory.test2(1)
        //    .then(function(stuff){
        //        console.log(stuff.data);
        //    });
        //$scope.oldReviews = true;
        //$scope.newReviews = false;
        //$scope.popularReviews = false;
        //$scope.setOldReviews = function(){
        //    $scope.oldReviews = true;
        //    $scope.newReviews = false;
        //    $scope.popularReviews = false;
        //};
        //$scope.setNewReviews = function(){
        //    $scope.oldReviews = false;
        //    $scope.newReviews = true;
        //    $scope.popularReviews = false;
        //    console.log("setNewReviews triggered");
        //    //$scope.getInitialReviews();
        //};
        //$scope.setPopularReviews = function(){
        //    $scope.oldReviews = false;
        //    $scope.newReviews = false;
        //    $scope.popularReviews = true;
        //};
        //function setQuery(){
        //    var query = "?";
        //    if($scope.oldReviews == true){
        //        query += "ordering=modified";
        //    }else if($scope.newReviews==true){
        //        query += "ordering=-modified";
        //    }else if($scope.popularReviews==true){
        //        query += "";
        //    }
        //
        //    return query;
        //}
        //
        //$scope.getNextReviews = function(){
        //
        //};



        //$scope.updateGrid= function(){
        //    gridFactory.getAllReviews("", 1)
        //        .then(function(allReviews)
        //}
        $scope.$watch('filteredSubjects', function() {

            console.log("FILT CHANGED" + $scope.filteredSubjects);
            function getInitialReviews() {
                if (Object.prototype.toString.call($scope.filteredSubjects) === '[object Array]') {
                    //alert('Array!');

                    for (var i = 0; i < $scope.filteredSubjects.length; i++) {
                        (function(i) {
                            console.log("LOOPING WITH I = " + i);
                            gridFactory.getReviews("", $scope.filteredSubjects[i].id)
                                .then(function (response) {
                                    $scope.filteredSubjects[i].reviews = response.data;
                                });
                        })(i);
                    }
                    console.log(JSON.stringify($scope.filteredSubjects));
                }
            }
            getInitialReviews();
        }, true);

    };
    gridController.$inject = ['$scope', '$http', 'gridFactory'];
    angular.module('mainApp').controller('gridController', gridController)
}());

