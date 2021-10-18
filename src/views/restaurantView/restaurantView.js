import Navbar from '../../components/navbar/navbar.js';
import {DishPopup} from '../../components/dishPopup/dishPopup.js';
import {Cart} from '../../components/cart/cart.js';
import {View} from '../baseView/View.js';
import store from '../../modules/store.js';

export class RestaurantView extends View {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller,
  }) {
    super({
      parent: parent,
      routeTo: routeTo,
      controller: controller,
    });
    this.navbar = Navbar;

    this.popup = new DishPopup({
      parent: document.body,
      routeTo: this.routeTo,
      controller: this.controller,
    });

    this.cart = new Cart({
      parent: this.parent,
      routeTo: this.routeTo,
      controller: this.controller,
    })
  }

  render(props = {}) {
  // TODO: Запрос ресторана из модели
    this.restaurant = props;

    this.navbar.render();
    const template = Handlebars.templates['page.hbs'];
    this.parent.insertAdjacentHTML('afterbegin', template({
      auth: store.getState().userState.auth,
      head: Handlebars.templates['restaurantHeader.hbs'](this.restaurant),
      content: Handlebars.templates['restaurantPage.hbs'](this.restaurant),
    }));

    this.cart.parent = this.parent.querySelector('.restaurant-page__cart');
    this.cart.render(this.restaurant);

    this.popup.restaurant = this.restaurant;

    this.settingUp();
  }

  settingUp() {
    this.popup.settingUp();

    this.anchors = document.querySelectorAll('a[href*="#"]');
    this.menuNavsTitles = document.querySelectorAll('.restaurant-page__menu-title');
    this.menuNavsButtons = document.querySelectorAll('.restaurant-nav__btn');

    for (const anchor of this.anchors) {
      anchor.addEventListener('click', this.scrollingToMenu);
    }

    window.addEventListener('scroll', this.stickNavbar);
    window.addEventListener('scroll', this.navHighlight);

    this.sticky = document.querySelector('.restaurant-nav__list').offsetTop;
  }

  stickNavbar = () => {
    const menuNavbar = document.querySelector('.restaurant-nav__list');
    if (window.pageYOffset >= this.sticky) {
      menuNavbar.classList.add('sticky');
      menuNavbar.style.left = '0';
      menuNavbar.style.borderBottom = 'solid 1px #e2e2e2';
      menuNavbar.style.paddingLeft = '3%';
    } else {
      menuNavbar.classList.remove('sticky');
      menuNavbar.style.borderBottom = '';
      menuNavbar.style.paddingLeft = '0';
    }
  };

  navHighlight = () => {
    // turn off highlight
    this.menuNavsButtons.forEach((item) => {
      item.style.borderBottom = '';
    })

    // find the needed title
    let title;
    this.menuNavsTitles.forEach((item, i) => {
      if (item.offsetTop <= window.pageYOffset) {
        title = this.menuNavsButtons[i];
      }
    });
    // if it is not undef highlight it
    if (title) {
      title.style.borderBottom = 'solid 1px black';
    }
  }

  scrollingToMenu = (e) => {
    e.preventDefault();
    const blockID = e.target.closest('a').getAttribute('href').substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  continueOrdering = (newR, oldR) => {
    this.popup.remove();
    this.continueDiv = document.createElement('div');
    this.continueDiv.classList.add('continue-popup-div');
    this.continueDiv.innerHTML = Handlebars.templates['continuePopup.hbs']({new: newR, old: oldR});
    this.parent.appendChild(this.continueDiv);
    document.body.style.overflowY = 'hidden';

    this.continueDiv.querySelector('.continue-popup-cancel').addEventListener('click', this.closeContinueOrdering);
    this.continueDiv.querySelector('.continue-popup-continue').addEventListener('click', this.acceptContinueOrdering);
  }

  closeContinueOrdering = () => {
    if (this.continueDiv) {
      this.continueDiv.querySelector('.continue-popup-cancel').removeEventListener('click', this.closeContinueOrdering);
      this.continueDiv.querySelector('.continue-popup-continue').removeEventListener('click', this.acceptContinueOrdering);
      this.parent.removeChild(this.continueDiv);
    }
    document.body.style.overflowY = 'scroll';
  }

  acceptContinueOrdering = () => {
    this.controller.continueAdding();
    this.closeContinueOrdering();
  }

  remove() {
    window.removeEventListener('scroll', this.stickNavbar);
    window.removeEventListener('scroll', this.navHighlight);
    this.anchors.forEach((anchor) => {
      anchor.removeEventListener('click', this.scrollingToMenu);
    });

    if (this.continueDiv) {
      this.closeContinueOrdering();
    }
    this.navbar.remove();
    this.popup.remove();
    this.cart.remove();
    this.parent.innerHTML = '';
  }
}

