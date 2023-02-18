let errorInternet = document.getElementById('error');
let successInternet = document.getElementById('success');

window.addEventListener('offline', function(){
    errorInternet.style.display = 'block';
})

window.addEventListener('online', function(){
    successInternet.style.display = 'block';
})