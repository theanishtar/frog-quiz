app.controller("inforCtrl", function ($rootScope, $scope) {
	localStorage.setItem("FrogQuiz-Cursor", "#main");

	$scope.checkGender;
	function getGender() {
		if ($rootScope.Student.gender == "Male") {
			$scope.checkGender = "Male";
		} else if ($rootScope.Student.gender == "Female") {
			$scope.checkGender = "Female";
		} else {
			$scope.checkGender = "Other";
		}
	}

	getGender();
	$scope.confirm = function () {
		if (isNaN($rootScope.Student.schoolfee)) {
			//istring
			showErrorToastSchoolfee();
			return;
		}

		// if(isValid($rootScope.Student.fullname)){
		//     alert(true)
		// } else {
		//     alert(false)
		// }
		// return;

		let getUser = null;
		//get req database
		let path = 'user';

		var dbRef = firebase.database().ref().child(path + '/' + $rootScope.Student.username);

		dbRef.on('value', (snapshot) => {
			//console.log(snapshot.val());
			if (!snapshot.val()) {
				alert("Lỗi kết nối database!");
				return;
			}
			getUser = snapshot.val();
		}, (errorObject) => {
			alert("Lỗi kết nối database!");
			console.log('The read failed: ' + errorObject.name);
		});

		// let bd = document.getElementById('bd').value;
		// $rootScope.Student.birthday = bd;

		console.log($rootScope.Student);
		console.log(getUser);



		let male = document.getElementById('maleGender');
		let female = document.getElementById('femaleGender');

		let bd = document.getElementById('bd').value;
		$rootScope.Student.birthday = bd;
		let gend;
		if (male.checked)
			gend = "Male"
		else if (female.checked)
			gend = "Female"
		else
			gend = "Other"

		$rootScope.Student.gender = gend;

		firebase.database().ref("user/" + $rootScope.Student.username).set($rootScope.Student);

		showSuccessToast();


		window.location.href = "#infor"
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

	function showErrorToast() {
		toast({
			title: "Thông báo!",
			message: "Có vẻ bạn chưa thay đổi dữ liệu gì nhỉ?",
			type: "warning",
			duration: 5000
		});
	}

	function showErrorToastSchoolfee() {
		toast({
			title: "Lỗi!",
			message: "Dữ liệu trường học phí không hợp lệ",
			type: "warning",
			duration: 5000
		});
	}

	function removeAscent(str) {
		if (str === null || str === undefined) return str;
		str = str.toLowerCase();
		str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
		str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
		str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
		str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
		str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
		str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
		str = str.replace(/đ/g, "d");
		return str;
	}

	function isValid(string) {
		var re = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g // regex here
		return re.test(removeAscent(string))
	}
});