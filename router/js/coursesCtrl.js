
app.controller("coursesCtrl", function ($rootScope, $scope, $http) {
	localStorage.setItem("FrogQuiz-Cursor", "#courses");
	$scope.count = 1;
	$scope.subjects = [
	];
	$http.get('../db/Subjects.json').then(function (reponse) {
		$scope.subjects = reponse.data;
	});
	$scope.begin = 0;
	$scope.pageCount = Math.ceil($scope.Subjects.length / 6);
	$scope.prev = function () {
		if ($scope.begin > 0) {
			$scope.begin -= 6;
		}
		$scope.count--;
	}
	$scope.next = function () {
		if ($scope.begin < ($scope.pageCount - 1) * 6) {
			$scope.begin += 6;
		}
		$scope.count++;

	}

	$scope.checkAccount = function (id) {
		if ($rootScope.Student == null) {
			Swal.fire({
				title: 'Để làm bài tập vui lòng đăng nhập vào hệ thống </br> Bạn có muốn di chuyển tới trang đăng nhập không?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#3085d6',
				confirmButtonText: 'Có',
				cancelButtonText: 'Không'
			}).then((result) => {
				if (result.value) {
					window.location.href = "#login";
				}
			})
		} else {
			window.location.href = "#course/" + id;
		}
	}
});