

function changeMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

function darkModeEffect() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

function changesIcon(x) {
    darkModeEffect();
    x.classList.toggle("bx-sun");
    setMode();
}

function setMode() {
    let darkMode = document.getElementsByClassName("dark-mode");

    // 
    if (darkMode.length == 0) {
        // alert("dark mode -> light mode")
        localStorage.setItem("modeByThean", "light")
    } else {
        // alert("light mode -> dark mode")
        localStorage.setItem("modeByThean", "dark")
    }
}

window.onload = function () {
    let mode = localStorage.getItem("modeByThean");
    if (mode == "dark") {
        let darkMode = document.getElementsByClassName("dark-mode");

        // 
        if (darkMode.length == 0) {
            // alert("dark mode -> light mode")
            darkModeEffect();

            //thay đổi icon
            let icon = document.getElementsByClassName("sun-moon");
            console.log(icon);
            icon[0].classList.toggle("bx-sun");
            icon[1].classList.toggle("bx-sun");
        } else {
            changeMode() ;
        }
    }
}
