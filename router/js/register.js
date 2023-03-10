app.controller("registerCtrl", function ($rootScope, $http, $scope) {
    var check = 0;
    $scope.register = function () {
        if ($scope.Student.username == null || $scope.Student.username.length < 4) {
            Swal.fire({
                title: "<h4 style='color: red;font-weight: bold;'>Tên đăng nhập phải tối thiểu 4 ký tự</h4> <br>",
                icon: 'error'
            });
            return;
        }

        if ($scope.Student.password == null || $scope.Student.password.length < 4) {
            Swal.fire({
                title: "<h4 style='color: red;font-weight: bold;'>Mật khẩu phải tối thiểu 4 ký tự</h4> <br>",
                icon: 'error'
            });
            return;
        }

        
        // if ($scope.Student.password == $scope.confirm_pass) {
        //     $rootScope.Students.forEach(arr => {
        //         if (arr.email == $scope.Student.email) {
        //             check = 1;
        //         }

        //     });
        //     if (check == 0) {
        //         $rootScope.Students.push($scope.Student);
        //     }
        //     else {
        //         alert("Tài khoản đã tồn tại");
        //     }
        // }else {
        //     alert("Mật khẩu nhập lại sai");
        // }

        let path = 'user'; // + '/' + $scope.Student.username
        var dbRef = firebase.database().ref().child(path);


        dbRef.on('value', (snapshot) => {
            console.log(snapshot.val());

            var checkTonTai = false;
            //kiểm tra email trùng
            snapshot.forEach(function (childSnapshot) {
                console.log(snapshot.numChildren());
                var key = childSnapshot.key;
                console.log(key);
                let getEmailFromFirebase = snapshot.child(key).val().email;
                let getUsernameFromFirebase = snapshot.child(key).val().username;

                //alert(getEmailFromFirebase);
                //alert(getUsernameFromFirebase == $scope.Student.username);

                if ($scope.Student.username == getUsernameFromFirebase) {
                    Swal.fire({
                        title: '<h1 style="color: red; font-size:20px;font-weight: bold;">Tài khoản đã tồn tại </br>Vui lòng chọn tên đăng nhập khác</h1>',
                        icon: 'warning',
                        showConfirmButton: false,
                        showCancelButton: false,
                        timer: 3000

                    });
                    //alert("username da ton tai");
                    checkTonTai = true;
                    return;
                }
                if ($scope.Student.email == getEmailFromFirebase) {
                    Swal.fire({
                        title: '<h1 style="color: red; font-size:20px;font-weight: bold;">Email đã tồn tại </br>Vui lòng chọn email khác</h1>',
                        icon: 'warning',
                        showConfirmButton: false,
                        showCancelButton: false,
                        timer: 3000

                    });

                    //alert("Email da ton tai");
                    checkTonTai = true;
                    return;
                }
            });
            if (!checkTonTai) {
                //confirmExamCode();
                //alert($scope.Student.email)
                var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!pattern.test($scope.Student.email)) {
                    Swal.fire({
                        title: "<h4 style='color: red;font-weight: bold;'>Email không hợp lệ</h4> <br>",
                        icon: 'error'
                    });
                    return;
                }
                

                var confirmCode = "";
                for (var i = 0; i < 6; i++) {
                    var ran = Math.floor(Math.random() * 9);
                    confirmCode += ran;
                }

                //send mail
                alert($scope.Student.email+" "+confirmCode);
                Email.send({
                    SecureToken: "d2b8e750-6234-4ee4-bf52-9a07d483114d",
                    To: $scope.Student.email,
                    From: "frogtech.contact@gmail.com",
                    Subject: "Hệ thống Frog Quiz gửi mã xác nhận tài khoản",
                    Body: "Xin chào " + $scope.Student.username + " mã xác nhận của bạn là: " + confirmCode
                }).then(
                    message => alert(message)
                );


                const { value: text } = Swal.fire({
                    title: "<h4 style='color: red;font-weight: bold;'>Xác nhận email</h4> <br>",
                    input: 'text',
                    inputPlaceholder: 'Nhập mã xác nhận được gửi đến email của bạn...',
                    showConfirmButton: true,
                    showCancelButton: true,
                    cancelButtonColor: 'red',
                    allowOutsideClick: false,
                    inputValidator: (value) => {
                        return new Promise((resolve) => {
                            if (value === '') {
                                resolve('Vui lòng nhập dữ liệu');
                            } else {
                                if (value == confirmCode) {
                                    //add database
                                    firebase.database().ref("user/" + $scope.Student.username).set({
                                        "username": $scope.Student.username,
                                        "password": $scope.Student.password,
                                        "fullname": "Người Dùng Mới",
                                        "email": $scope.Student.email,
                                        "gender": "male",
                                        "birthday": "2003-12-10",
                                        "schoolfee": 0,
                                        "marks": 0
                                    });
                                    //alert
                                    Swal.fire({
                                        title: '<h1 style="color: red; font-size:20px;font-weight: bold;">Tạo tài khoản thành công!</h1>',
                                        icon: 'success',
                                        showConfirmButton: false,
                                        showCancelButton: false,
                                        timer: 3000
            
                                    });
                                } else {
                                    Swal.fire({
                                        title: '<h1 style="color: red; font-size:20px;font-weight: bold;">Mã xác nhận không đúng! <br>Vui lòng thử lại sau!</h1>',
                                        icon: 'warning',
                                        showConfirmButton: false,
                                        showCancelButton: false,
                                        timer: 3000
            
                                    });
                                }
                            }
                        })
                    }
                })
            }


        }, (errorObject) => {
            Swal.fire({
                title: '<h1 style="color: red; font-size:20px;font-weight: bold;">Không thể kết nối database</h1>',
                icon: 'warning',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1000

            });
        });

        async function confirmExamCode() {

            var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!pattern.test($scope.Student.email)) {
                Swal.fire({
                    title: "<h4 style='color: red;font-weight: bold;'>Email không hợp lệ</h4> <br>",
                    icon: 'error'
                });
                return;
            }
            if ($scope.Student.password == null || $scope.Student.password.length < 4) {
                Swal.fire({
                    title: "<h4 style='color: red;font-weight: bold;'>Mật khẩu phải tối thiểu 4 ký tự</h4> <br>",
                    icon: 'error'
                });
                return;
            }

            var confirmCode = "";
            for (var i = 0; i < 6; i++) {
                var ran = Math.floor(Math.random() * 9);
                confirmCode += ran;
            }

            //send mail
            alert($scope.Student.email);
            Email.send({
                SecureToken: "d2b8e750-6234-4ee4-bf52-9a07d483114d",
                To: $scope.Student.email,
                From: "frogtech.contact@gmail.com",
                Subject: "Hệ thống Frog Quiz gửi mã xác nhận tài khoản",
                Body: "Xin chào " + $scope.Student.username + " mã xác nhận của bạn là: " + confirmCode
            }).then(
                message => alert(message)
            );


            const { value: text } = await Swal.fire({
                title: "<h4 style='color: red;font-weight: bold;'>Xác nhận email</h4> <br>",
                input: 'text',
                inputPlaceholder: 'Nhập mã xác nhận được gửi đến email của bạn...',
                showConfirmButton: true,
                showCancelButton: true,
                cancelButtonColor: 'red',
                allowOutsideClick: false,
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value === '') {
                            resolve('Vui lòng nhập dữ liệu');
                        } else {
                            resolve()
                        }
                    })
                }
            })
            if (text) {
                alert(text);
                alert(confirmCode);
                if (text == confirmCode) {
                    //add database
                    firebase.database().ref("user/" + $scope.Student.username).set({
                        "username": $scope.Student.username,
                        "password": $scope.Student.password,
                        "fullname": "Người Dùng Mới",
                        "email": $scope.Student.email,
                        "gender": "true",
                        "birthday": "2003-12-10",
                        "schoolfee": "0",
                        "marks": "0"
                    });
                    //alert
                    Swal.fire({
                        title: '<h1 style="color: red; font-size:20px;font-weight: bold;">Tạo tài khoản thành công!</h1>',
                        icon: 'success',
                        showConfirmButton: false,
                        showCancelButton: false,
                        timer: 3000

                    });
                } else {
                    Swal.fire({
                        title: '<h1 style="color: red; font-size:20px;font-weight: bold;">Mã xác nhận không đúng! <br>Vui lòng thử lại sau!</h1>',
                        icon: 'warning',
                        showConfirmButton: false,
                        showCancelButton: false,
                        timer: 3000

                    });
                }
            }
        };

    }
})