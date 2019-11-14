
function toggleResponsive() {
  var navbar = document.getElementById("navbar");
  if (navbar.className === "navbar") {
    navbar.className += " responsive";
  } else {
    navbar.className = "navbar";
  }

  var menu = document.getElementById("responsive-menu");
  if (menu.className === "responsive-menu") {
    menu.className += " sm-visible";
  } else {
    menu.className = "responsive-menu";
  }
}

