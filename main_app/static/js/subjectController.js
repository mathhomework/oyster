(function(){

    var subjectController = function($scope, $http){
        $scope.word = "HUZZAH!";
        $scope.voteUp = function(){
            $scope.word = "VOTEDUP";

        };
        console.log("HERRO");
        $http.post("/api/subjectvotes/?format=json").success(function(data){
            console.log(data);
        });
    };
    subjectController.$inject = ['$scope', '$http'];
    angular.module('mainApp').controller('subjectController', subjectController)
}());