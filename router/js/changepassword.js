app.controller("changePasswordCtrl", function ($rootScope, $scope) {
    $scope.confirm = function () {


        let oldPass = document.getElementById('oldPass').value;
        let newPass = document.getElementById('newPass').value;
        let confirmPass = document.getElementById('confirmPass').value;

        if (oldPass == "" || newPass == "" || confirmPass == "") {
            showErrorToastNull();
            return;
        }
        if ($rootScope.Student.password != oldPass) {
            showErrorToast();
            return;
        }


        if (newPass != confirmPass) {
            showErrorToastConfirm();
            return;
        }

        $rootScope.Student.password = newPass;
        firebase.database().ref("user/" + $rootScope.Student.username).set($rootScope.Student);
        localStorage.setItem("user-pass", newPass);
        showSuccessToast();
    }

    function showErrorToast() {
        toast({
            title: "Thất bại!",
            message: "Mật khẩu cũ không chính xác! </br> Vui lòng kiểm tra lại.",
            type: "error",
            duration: 5000
        });
    }

    function showErrorToastConfirm() {
        toast({
            title: "Thất bại!",
            message: "Mật khẩu mới không trùng khớp! </br> Vui lòng kiểm tra lại.",
            type: "error",
            duration: 5000
        });
    }

    function showErrorToastNull() {
        toast({
            title: "Thất bại!",
            message: "Bạn chưa nhập dữ liệu! </br> Vui lòng nhâoj đầy đủ.",
            type: "warning",
            duration: 5000
        });
    }

    //toast
    function showSuccessToast() {
        toast({
            title: "Thành công!",
            message: "Cập nhật tài khoản thành công.",
            type: "success",
            duration: 5000
        });
    }
});