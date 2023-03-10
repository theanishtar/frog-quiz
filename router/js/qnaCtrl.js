app.controller("qnaCtrl", function ($rootScope, $scope) {
    function reloadPage() {
        alert(9);
        //reload my page when click qna page
        
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
                    //window.location.reload();
                    
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

    function aut(){
        let giscusTheme = localStorage.getItem("modeByThean") || "light";
            // if(giscusTheme == null){
            //     localStorage.setItem("modeByThean","light");
            //     giscusTheme = 'light';
            // }
            let giscusAttributes = {
                "src": "https://giscus.app/client.js",
                "data-repo": "dangth12/docs",
                "data-repo-id": "R_kgDOI5SZdw",
                "data-category": "Announcements",
                "data-category-id": "DIC_kwDOI5SZd84CT-UT",
                "data-mapping": "og:title",
                "data-strict": "0",
                "data-reactions-enabled": "1",
                "data-emit-metadata": "0",
                "data-input-position": "bottom",
                "data-theme": giscusTheme,
                "data-lang": "vi",
                "crossorigin": "anonymous",
                "async": "",
            };

            let giscusScript = document.createElement("script");
            Object.entries(giscusAttributes).forEach(([key, value]) => giscusScript.setAttribute(key, value));
            // document.body.appendChild(giscusScript);

            let content = document.getElementById('cmt');
            content.appendChild(giscusScript);
    }
    //reloadPage();
    aut();
    localStorage.setItem("FrogQuiz-Cursor","#qna");
});