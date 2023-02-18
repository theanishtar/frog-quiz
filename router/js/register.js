app.controller("registerCtrl", function ($rootScope, $http, $scope) {
    var check = 0;
    $scope.register = function () {
        if ($scope.Student.password == $scope.confirm_pass) {
            $rootScope.Students.forEach(arr => {
                if (arr.email == $scope.Student.email) {
                    check = 1;
                }

            });
            if (check == 0) {
                $rootScope.Students.push($scope.Student);
            }
            else {
                alert("Tài khoản đã tồn tại");
            }
        }else {
            alert("Mật khẩu nhập lại sai");
        }

    }
})