function login() {

    var item1 = document.getElementById('user').value;
    var result = document.getElementById('result');
  
    console.log("Username: " + item1 );
  
    let path = 'user';
    var dbRef = firebase.database().ref().child(path + '/' + item1);
  
  
  
  
  
    dbRef.on('value', (snapshot) => {
        console.log(snapshot.val());
        if (snapshot.val() == null)
            result.innerText = "kh Tồn tại";
        else
            result.innerText="tồn tại " + snapshot.val().email;
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    });
  }