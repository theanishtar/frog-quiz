var menuMobileRight = document.getElementById("menu-mobile");
var header = document.getElementById("header");
var mobileMenu = document.getElementById("mobile-menu");
var icon = document.getElementById("menu-i");

function changesIconMenu() {
    // icon.classList.toggle("ti-menu");
    // icon.classList.toggle("ti-close");
    icon.classList.toggle("is-active");
}

// mobile menu
mobileMenu.onclick = function () {
    changesIconMenu();
    var isOpen = menuMobileRight.getBoundingClientRect().left;
    //console.log(isOpen);
    if (isOpen > 300) {
        menuMobileRight.style.right = "0";
        //header.style.height = "auto";
        // header.style.width = "70%";
    } else {
        menuMobileRight.style.right = "-100%";
        //header.style.height = null;
    }
    //console.log(isOpen)
};

// auto close when clicked menu mobile
var menuItems = document.querySelectorAll('#nav li a[href*="#"]');
for (let i = 0; i < menuItems.length; i++) {
    const menuItem = menuItems[i];
    menuItem.onclick = function (event) {
        var isParentMenu =
            this.nextElementSibling &&
            this.nextElementSibling.classList.contains("subnav");
        if (isParentMenu) {
            event.preventDefault();
        } else {
            header.style.height = null;
        }
    };
}