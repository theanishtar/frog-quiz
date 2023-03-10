app.controller("managerCtrl", function ($rootScope, $scope) {
    localStorage.setItem("FrogQuiz-Cursor", "#manager");

    $scope.setting = false;
    let user = [];
    let path = 'user';
    var dbRef = firebase.database().ref().child(path);

    dbRef.on('value', (snapshot) => {
        //Students.push(snapshot.val());
        snapshot.forEach(function (childSnapshot) {
            var keyl = childSnapshot.key;
            user.push(snapshot.child(keyl).val());

        });
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    });

    $scope.Users = user;

    $scope.edit = function (index) {
        $scope.setting = true;
        $scope.user = angular.copy($scope.Users[index]) ;

        //lấy lại user để sửa JSON trên db
        $scope.username = $scope.user.username;

        console.log($scope.user)

        // $scope.user = {
        //     "birthday": $scope.Users[index].birthday,
        //     "email": $scope.Users[index].email,
        //     "fullname": $scope.Users[index].name,
        //     "gender": $scope.Users[index].gender,
        //     "marks": $scope.Users[index].marks,
        //     "password": $scope.Users[index].password,
        //     "schoolfee": $scope.Users[index].schoolfee,
        //     "username": $scope.Users[index].username
        // };


    }

    $scope.update = function () {
        firebase.database().ref("user/" + $scope.username).set($scope.user);
        showSuccessToast();
    }

    $scope.delete = function () {
        firebase.database().ref("user/" + $scope.username).set("");
        console.log($scope.user)
        deleteSuccess();
    }

    function showSuccessToast() {
        toast({
            title: "Thành công!",
            message: "Cập nhật tài khoản thành công.",
            type: "success",
            duration: 5000
        });
    }

    function deleteSuccess() {
        toast({
            title: "Thành công!",
            message: "Cập nhật tài khoản thành công.",
            type: "success",
            duration: 5000
        });
    }

})