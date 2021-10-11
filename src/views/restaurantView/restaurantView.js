import User from '../../modules/user.js';
import Navbar from '../../components/navbar/navbar.js';
import {View} from '../baseView/View.js';
import {getRestaurantMock} from '../mocks.js';

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
  }

  render(props = {}) {
    this.restaurant = getRestaurantMock();  // TODO: Запрос ресторана из модели

    this.navbar.render();
    const template = Handlebars.templates['page.hbs'];
    this.parent.insertAdjacentHTML('afterbegin', template({
      auth: User.Auth,
      head: Handlebars.templates['restaurantHeader.hbs'](this.restaurant),
      content: Handlebars.templates['restaurantUnderheader.hbs'](this.restaurant) + Handlebars.templates['restaurantPage.hbs'](this.restaurant),
    }));

    this.settingUp();
  }

  settingUp() {
    this.anchors = document.querySelectorAll('a[href*="#"]');
    this.menuNavsTitles = document.querySelectorAll('.restaurant-page__menu-title');
    this.menuNavsButtons = document.querySelectorAll('.restaurant-nav__btn');
    this.dishes = document.querySelectorAll('.dish');

    this.dishes.forEach((item) => {
      item.addEventListener('click', this.showPopup);
    });

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

  showPopup = (e) => {
    const dishId = e.target.closest('.dish').id;

    const dishes = [];
    this.restaurant.menuNavs.forEach((item) => {
      dishes.push(item.dishes);
    });

    const dish = dishes.flat(Infinity).find((item) => {
      return dishId === item.id;
    });

    const div = document.createElement('div');
    div.classList.add('dish-popup-div');
    div.innerHTML = Handlebars.templates['dishPopup.hbs'](dish);
    document.body.appendChild(div);
    document.body.style.overflowY = 'hidden';

    document.body.querySelector('.dish-popup__close-button').addEventListener('click', this.removePopup);
    document.body.querySelector('.dish-popup-wrapper').addEventListener('click', this.outsidePopupClick);

    document.body.querySelector('.plus').addEventListener('click', this.increaseNumber);
    document.body.querySelector('.minus').addEventListener('click', this.decreaseNumber);

    document.body.querySelectorAll('.dish-popup__checkbox-input').forEach((item) => {
      item.addEventListener('input', this.refreshSummary);
    });
  }

  outsidePopupClick = (e) => {
    if (!document.body.querySelector('.dish-popup').contains(e.target)) {
      this.removePopup();
    }
  }

  removePopup = () => {
    document.body.querySelector('.dish-popup__close-button').removeEventListener('click', this.removePopup);
    document.body.querySelector('.dish-popup-wrapper').removeEventListener('click', this.outsidePopupClick);

    document.body.querySelector('.plus').removeEventListener('click', this.increaseNumber);
    document.body.querySelector('.minus').removeEventListener('click', this.decreaseNumber);

    document.body.querySelectorAll('.dish-popup__checkbox-input').forEach((item) => {
      item.removeEventListener('input', this.refreshSummary);
    });

    document.body.removeChild(document.body.querySelector('.dish-popup-div'));
    document.body.style.overflowY = 'scroll';
  }

  increaseNumber = () => {
    const number = document.body.querySelector('.dish-popup__number');
    number.innerHTML = String(Number(number.innerHTML) + 1);

    this.refreshSummary();
  }

  decreaseNumber = () => {
    const number = document.body.querySelector('.dish-popup__number');
    if (Number(number.innerHTML) > 1) {
      number.innerHTML = String(Number(number.innerHTML) - 1);
    }

    this.refreshSummary();
  }

  refreshSummary = () => {
    const dishes = [];
    this.restaurant.menuNavs.forEach((item) => {
      dishes.push(item.dishes);
    });

    let cost = Number(dishes.flat(Infinity)[Number(document.body.querySelector('.dish-popup').id)].dishCost);

    const checkboxes = document.body.querySelectorAll('.dish-popup__checkbox-row');
    checkboxes.forEach((item) => {
      if (item.querySelector('input').checked) {
        cost += Number(item.querySelector('.dish-popup__checkbox-cost').innerHTML);
      }
    });

    const summary = document.body.querySelector('.dish-popup__summary-cost');
    const number = document.body.querySelector('.dish-popup__number');
    summary.innerHTML = String(cost * Number(number.innerHTML));
  }

  remove() {
    window.removeEventListener('scroll', this.stickNavbar);
    window.removeEventListener('scroll', this.navHighlight);
    this.anchors.forEach((anchor) => {
      anchor.removeEventListener('click', this.scrollingToMenu);
    })
    this.navbar.remove();
    this.parent.innerHTML = '';
  }

}

