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

        factory.getReviews = function(subject_id, query){
            var deferred = $q.defer();
            var full_query = "";
            if(typeof subject_id !== "undefined"){
                full_query= "?subject=" + subject_id.toString();
            }
            if(typeof query !== "undefined"){
                full_query += query;
            }
            $http.get(url + "api/reviews/" + full_query)
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
            $http.get(url + "api/subjects/?on=True")
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

    var gridController = function($scope, $http, gridFactory, $filter){
        $scope.filteredSubjects = null;
        $scope.allSubjects = [];
        var filteredSubjectsStart = 0;
        function populateAllSubjects(){
            gridFactory.getAllSubjects()
                .then(function(subjects){
                    $scope.allSubjects = subjects.data;
                    console.log($scope.allSubjects);
                    function getInitialReviews() {
                        //note: right as page loads, I think
                        // ngInfiniteScroll causes 1 scroll which I think adds to subjectLimit
                        for (var i = 0; i < $scope.subjectLimit; i++) {
                            (function(i) {
                                gridFactory.getReviews($scope.allSubjects[i].id)
                                    .then(function (response) {
                                        $scope.allSubjects[i].reviews = response.data;
                                    });
                                filteredSubjectsStart = i;
                            })(i);
                        }
                    }
                    getInitialReviews();
                        //$scope.filteredSubjects = $filter('limitTo')($scope.allSubjects, 'subjectLimit');
                        //$scope.filteredSubjects = $filter('orderBy')($scope.filteredSubjects, 'subjectOrder');
                },
                (function(error){
                    console.log("populateAllSubjects Error:" + error);
                })
            );
        }
        $scope.subjectLimit = 4;
        //since scroll is triggered once when the page loads, this will be +1,

        $scope.getCurrentSubjectId = function(id){
            $scope.currentSubjectId = id;
            console.log("curr_id " + id);
            var query = "";
            gridFactory.getReviews(id, query)
                .then(function(response){
                    for(var i = 0; i<$scope.filteredSubjects.length; i++){
                        console.log('looping');
                        if($scope.filteredSubjects[i].id == id){
                            for(var j = 0; j<response.data.length; j++){
                                $scope.filteredSubjects[i].reviews.push(response.data[j]);
                            }
                            break;
                        }
                    }
                })
        };
        $scope.subjectOrder ='';
        populateAllSubjects();

        var first = true;
        $scope.infiniteSubjects = function() {
            if(first){
                first = false;
            }
            else{
                $scope.subjectLimit += 1;
                //console.log("filteredss" + filteredSubjectsStart);
                //console.log("ssL" + $scope.subjectLimit);
                //subjectLimit-2 is used, which means that after the subject is loaded,
                // you need to scroll one more click down to load it's review.. since it is actually
                // loading the previous review to the newly gotten subject.
                // the downside is that there is a tiny noticable moment where the subject is loaded
                // but the review is not loaded until you scroll one more click.
                // i feel like it may be related to this function being triggered upon load one time
                // which causes subjectLimit to automatically increase by 1.
                gridFactory.getReviews($scope.filteredSubjects[$scope.subjectLimit-2].id)
                    .then(function(response){
                        $scope.filteredSubjects[$scope.subjectLimit-2].reviews = response.data;
                    });
            }
        };
        $scope.setRatedSubjects = function(){
            if($scope.subjectOrder == "cumulative_score"){
                $scope.subjectOrder = "-cumulative_score";
            }
            else {
                $scope.subjectOrder = "cumulative_score"
            }
        };

        $scope.setVotedSubjects = function(){
            console.log('setvotedsubjects');
            if($scope.subjectOrder == "subject_votes_difference"){
                $scope.subjectOrder = "-subject_votes_difference";
            }
            else {
                $scope.subjectOrder = "subject_votes_difference"
            }
        };




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


        //$scope.$watch('filteredSubjects', function(newVal, oldVal) {
        //
        //    function getInitialReviews() {
        //        for (var i = 0; i < $scope.filteredSubjects.length; i++) {
        //            (function(i) {
        //                gridFactory.getReviews($scope.filteredSubjects[i].id )
        //                    .then(function (response) {
        //                        $scope.filteredSubjects[i].reviews = response.data;
        //                    });
        //            })(i);
        //        }
        //        //console.log(JSON.stringify($scope.filteredSubjects));
        //    }
        //    if (Object.prototype.toString.call($scope.filteredSubjects) === '[object Array]') {
        //        //alert('Array!');
        //        if(newVal === oldVal) {
        //        }else{
        //            console.log("oldVal" + JSON.stringify(oldVal));
        //            console.log("newVal" + JSON.stringify(newVal));
        //            getInitialReviews();
        //            angular.copy('filteredSubjects', $scope.filteredSubjects);
        //
        //            console.log("watch made");
        //        }
        //    }
        //
        //}, true);

    };
    gridController.$inject = ['$scope', '$http', 'gridFactory', '$filter'];
    angular.module('mainApp').controller('gridController', gridController)
}());

