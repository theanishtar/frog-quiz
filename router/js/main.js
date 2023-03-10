var app = angular.module("myApp", [
	"ngRoute"
]);

app.run(function ($rootScope, $http) {
	$rootScope.User = null;
	$rootScope.Student = null;
	// $http.get('db/Students.js').then(function (response) {
	//     $rootScope.Students = response.data;
	// });

	$http.get('db/Subjects.js').then(function (response) {
		$rootScope.Subjects = response.data;
	});

	// Tự động đăng nhập khi load trang
	autoLogin();

	function autoLogin() {
		//username password
		let userName = localStorage.getItem("user-name");
		let userPass = localStorage.getItem("user-pass");

		let path = 'user';
		var dbRef = firebase.database().ref().child(path + '/' + userName);

		// alert(userName);
		if (userName != "none" && userPass != "none") {
			dbRef.on('value', (snapshot) => {
				if (snapshot.val() == null) {
					return;
				}
				let getEmail = snapshot.val().email;
				let getUserName = snapshot.val().username;
				let getPass = snapshot.val().password;
				if (userPass == getPass && userName == getUserName) {
					//alert(true);
					$rootScope.Student = snapshot.val();
					$rootScope.User = $rootScope.Student;
					let task = sessionStorage.getItem('FrogQuiz-Sesion');

					if (task === 'course') {
						return;
					}
					let pointer = localStorage.getItem("FrogQuiz-Cursor");

					if (pointer == '#course') {
						return;
					}
					if (!pointer) {
						window.location.href = "#main";
						return;
					}
					if (pointer != '#course') {
						window.location.href = pointer;
					}

					// Swal.fire({
					//     title: '<h1 style="color: red; font-size:20px;font-weight: bold;">Tự động đăng nhập thành công</h1>',
					//     icon: 'success',
					//     showConfirmButton: false,
					//     showCancelButton: false,
					//     timer: 1000

					// });
				}

			}, (errorObject) => {
				console.log('The read failed: ' + errorObject.name);
			});
		}
	}

	$rootScope.logout = function () {

		Swal.fire({
			title: 'Bạn có chắc chắn đăng xuất?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Có',
			cancelButtonText: 'Không'
		}).then((result) => {
			if (result.value) {
				sessionStorage.setItem('FrogQuiz-Sesion', '');
				localStorage.setItem("user-name", "none");
				localStorage.setItem("user-pass", "none");
				localStorage.setItem("giscus-session", "");
				Swal.fire({
					icon: 'success',
					title: 'Đã đăng xuất!',
					text: 'Quay lại trang chủ!',
					showConfirmButton: false,
					closeOnClickOutside: false,
					allowOutsideClick: false,
					timer: 2000
				});
				$rootScope.Student = null;
				$rootScope.indexStudent = -1;
				window.location.href = "#!index";
				$rootScope.hide = 0;
			}
		})


	}

	$rootScope.getStating = function () {
		function showErrorToast() {
			toast({
				title: "Thất bại!",
				message: "Vui lòng đăng nhập vào hệ thống để bắt đầu.",
				type: "error",
				duration: 5000
			});
		}

		if ($rootScope.Student == null) {
			showErrorToast();
		} else {
			window.location.href = '#courses';
		}
	}

});

app.config(function ($routeProvider) {
	$routeProvider

		.when("/main", {
			templateUrl: "router/main.html"
		})
		.when("/about", {
			templateUrl: "router/about.html", controller: "aboutCrtl"
		})
		.when("/courses", {
			templateUrl: "router/courses.html", controller: "coursesCtrl"
		})
		.when("/course/:id", {
			templateUrl: "router/course.html", controller: "courseCtrl"
		})
		.when("/contact", {
			templateUrl: "router/contact.html", controller: "contactCrtl"
		})
		.when("/contribute", {
			templateUrl: "router/contribute.html", controller: "contributeCrtl"
		})
		.when("/qna", {
			templateUrl: "router/qna.html", controller: "qnaCtrl"
		})
		.when("/login", {
			templateUrl: "router/login.html", controller: "loginCtrl"
		})
		.when("/register", {
			templateUrl: "router/register.html", controller: "registerCtrl"
		})
		.when("/infor", {
			templateUrl: "router/infor.html", controller: "inforCtrl"
		})
		.when("/changepassword", {
			templateUrl: "router/changepassword.html", controller: "changePasswordCtrl"
		})
		.when("/forgetpassword", {
			templateUrl: "router/forgetpassword.html", controller: "forgetPasswordCtrl"
		})
		.when("/manager", {
			templateUrl: "router/manager.html", controller: "managerCtrl"
		})
		.otherwise({ redirectTo: "/main" });
});

