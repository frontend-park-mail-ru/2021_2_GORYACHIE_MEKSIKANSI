import dishesList from './dishesList.hbs';
import {DishPopup} from 'Components/dishPopup/dishPopup.js';


export class DishesList {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller,
  }) {
    this.controller = controller;
    this.routeTo = routeTo;
    this.parent = parent;
  }

  render({
    parent: parent,
    restaurant: restaurant,
  }) {
    this.parent = parent;
    this.restaurant = restaurant;
    this.parent.innerHTML = dishesList(this.restaurant);

    this.settingUp();
  }

  settingUp() {
    this.dishes = document.querySelectorAll('.dish');
    this.dishes.forEach((item) => {
      item.addEventListener('click', this.getDishForPopup);
    });

    this.anchors = document.querySelectorAll('a[href*="#"]');
    this.menuNavsTitles = document.querySelectorAll('.dishes-list__menu-title');
    this.menuNavsButtons = document.querySelectorAll('.restaurant-nav__btn');

    for (const anchor of this.anchors) {
      anchor.addEventListener('click', this.scrollingToMenu);
    }

    window.addEventListener('scroll', this.stickNavbar);
    window.addEventListener('scroll', this.navHighlight);

    this.sticky = document.querySelector('.restaurant-nav__list').offsetTop;
  }

  scrollingToMenu = (e) => {
    e.preventDefault();
    const blockID = e.target.closest('a').getAttribute('href').substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  stickNavbar = () => {
    const menuNavbar = document.querySelector('.restaurant-nav__list');
    if (window.pageYOffset >= this.sticky) {
      menuNavbar.classList.add('sticky');
    } else {
      menuNavbar.classList.remove('sticky');
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
      if (item.offsetTop - 5 <= window.pageYOffset) {
        title = this.menuNavsButtons[i];
      }
    });
    // if it is not undef highlight it
    if (title) {
      title.style.borderBottom = 'solid 1px black';
    }
  }

  getDishForPopup = (e) => {
    const {target} = e;
    const dishId = Number(target.closest('.dish').getAttribute('id'));
    this.controller.getDish(this.restaurant.id, dishId);
  }

  remove() {
    if (this.dishes) {
      this.dishes.forEach((item) => {
        item.removeEventListener('click', this.getDishForPopup);
      });
    }

    window.removeEventListener('scroll', this.stickNavbar);
    window.removeEventListener('scroll', this.navHighlight);
    this.anchors.forEach((anchor) => {
      anchor.removeEventListener('click', this.scrollingToMenu);
    });

    this.parent.innerHTML = '';
  }
}