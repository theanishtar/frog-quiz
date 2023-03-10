app.controller("loginCtrl", function ($rootScope, $scope) {
	var check = false;
	$scope.login = function () {

		let user = $scope.email.toLowerCase();
		let pass = $scope.pass;

		let path = 'user';
		var dbRef = firebase.database().ref().child(path + '/' + user);

		dbRef.on('value', (snapshot) => {

			if (snapshot.val() == null) {
				Swal.fire({
					title: '<h1 style="color: red; font-size:20px;font-weight: bold;">Tài khoản hoặc mật khẩu không đúng</h1>',
					icon: 'warning',
					showConfirmButton: false,
					showCancelButton: false,
					timer: 3000

				});
			}
			else {
				let getPass = snapshot.val().password;
				if (pass == getPass) {
					check = true;
					$rootScope.Student = snapshot.val();
					$rootScope.User = $rootScope.Student;

					localStorage.setItem("user-name", user);
					localStorage.setItem("user-pass", getPass);

					let task = sessionStorage.getItem('FrogQuiz-Sesion');

					if (task === 'course') {
						return;
					}
					window.location.href = "#main";

					Swal.fire({
						title: '<h1 style="color: red; font-size:20px;font-weight: bold;">Đăng nhập thành công...</h1>',
						icon: 'success',
						showConfirmButton: false,
						showCancelButton: false,
						timer: 1000

					});
				} else {
					Swal.fire({
						title: '<h1 style="color: red; font-size:20px;font-weight: bold;">Tài khoản hoặc mật khẩu không đúng</h1>',
						icon: 'warning',
						showConfirmButton: false,
						showCancelButton: false,
						timer: 3000

					});
				}
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

	}

	function login(user, pass) {

		let path = 'user';
		var dbRef = firebase.database().ref().child(path + '/' + user);

		dbRef.on('value', (snapshot) => {
			//console.log(snapshot.val());

			if (snapshot.val() == null)
				result.innerText = "kh Tồn tại";
			else
				result.innerText = "tồn tại " + snapshot.val().email;
		}, (errorObject) => {
			console.log('The read failed: ' + errorObject.name);
		});
	}

})
