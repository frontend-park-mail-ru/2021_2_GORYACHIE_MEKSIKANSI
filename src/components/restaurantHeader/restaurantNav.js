// When the user scrolls the page, execute myFunction
window.onscroll = function() {
  stickNavbar();
};

// Get the navbar
const navbar = document.querySelector('.restaurant-nav__list');

// Get the offset position of the navbar
const sticky = navbar.offsetTop;

const stickNavbar = () => {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add('sticky');
    navbar.style.left = '0';
    navbar.style.borderBottom = 'solid 1px #e2e2e2';
  } else {
    navbar.classList.remove('sticky');
    navbar.style.borderBottom = '';
  }
};
