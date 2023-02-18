var app = angular.module("myApp",[]);
app.controller("subjectCtrl", function($scope, $http){
    $scope.subjects = [
    ];
    $http.get('../../db/Subjects.js').then(function(reponse){
        $scope.subjects = reponse.data;
    });
});