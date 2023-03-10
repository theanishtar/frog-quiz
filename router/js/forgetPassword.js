
app.controller("forgetPasswordCtrl", function ($rootScope, $scope) {

    let getUser = [];
    let getUserName = [];
    let getIndex = -1;
    //get req database
    let path = 'user';

    var dbRef = firebase.database().ref().child(path);

    dbRef.on('value', (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
            var keyl = childSnapshot.key;
            getUser.push(snapshot.child(keyl).val().email);
            getUserName.push(snapshot.child(keyl).val().username);
        });
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    });
    $scope.confirmCode = "";
    $scope.findAccountSucces = 1;
    $scope.checkEmail = false;
    $scope.findUser = function () {
        let check = false;
        getUser.forEach((v, i) => {
            if (v.toLowerCase() == $scope.email.toLowerCase()) {
                check = true;
                getIndex = i;
            }
        });
        if (!check) {
            showErrorToastNotFind();
            return;
        } else {
            //alert("Co");
            for (var i = 0; i < 6; i++) {
                var ran = Math.floor(Math.random() * 9);
                $scope.confirmCode += ran;
            }

            //send mail
            //alert($scope.Student.email);
            Email.send({
                SecureToken: "d2b8e750-6234-4ee4-bf52-9a07d483114d",
                To: $scope.email,
                From: "frogtech.contact@gmail.com",
                Subject: "Hệ thống Frog Quiz gửi mã xác nhận tài khoản",
                Body: "Xin chào! mã xác nhận của bạn là: " + $scope.confirmCode
            }).then(
                message => alert(message)
            );

            sendSucces();
            $scope.findAccountSucces = 2;
        }
        //$scope.findAccountSucces = 2;
    }

    $scope.validEmail = function () {
        //alert($scope.confirmCode)
        if ($scope.confirmCode == $scope.code) {
            $scope.findAccountSucces = 3;
            return;
        }
        errorCodeEqual();
        //
        
    }

    $scope.changePass = function () {
        if ($scope.pass != $scope.passConfirm) {
            errorPassEqual();
            return;
        }
        if (getIndex >= 0) {
            //add lên database với username = getUserName[getindex]
            firebase.database().ref("user/" + getUserName[getIndex] + "/password").set($scope.pass);
            changeSucces();
        }
    }

    function showErrorToastNotFind() {
        toast({
            title: "Thông báo!",
            message: "Không tìm thấy email bạn trên server!",
            type: "warning",
            duration: 5000
        });
    }

    function sendSucces() {
        toast({
            title: "Thông báo!",
            message: "Gửi mã xác nhận thành công </br> Vui lòng kiểm ra email!",
            type: "success",
            duration: 5000
        });
    }

    function errorPassEqual() {
        toast({
            title: "Thông báo!",
            message: "Bạn cần xác nhận đúng mật khẩu mới!",
            type: "error",
            duration: 5000
        });
    }

    function changeSucces() {
        toast({
            title: "Thông báo!",
            message: "Đổi mật khẩu thành công!",
            type: "success",
            duration: 5000
        });
    }

    function errorCodeEqual() {
        toast({
            title: "Thông báo!",
            message: "Mã xác nhận không chính xác</br> Vui lòng kiểm ra email!",
            type: "error",
            duration: 5000
        });
    }
})