
app.controller("coursesCtrl", function ($scope, $http) {
    $scope.subjects = [
    ];
    $http.get('../db/Subjects.js').then(function (reponse) {
        $scope.subjects = reponse.data;
    });
    $scope.begin = 0;
    $scope.pageCount = Math.ceil($scope.Subjects.length / 6);
    $scope.prev = function () {
        alert("a");
        if ($scope.begin > 0) {
            $scope.begin -= 6;
        }
    }
    $scope.next = function () {
        if ($scope.begin < ($scope.pageCount - 1) * 6) {
            $scope.begin += 6;
        }
    }
});