import dishesList from './dishesList.hbs';
import {RestaurantBlock} from 'hme-design-system/src/components/restaurantBlock/restaurantBlock';
import {List} from 'hme-design-system/src/components/list/list';
import {DishBlock} from 'hme-design-system/src/components/dishBlock/dishBlock';


/**
 * DishList class
 */
export class DishesList {
  /**
   * Constructor for DishList class
   *
   * @param {{parent: HTMLElement, routeTo: object, controller: Class}} params
   *
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller,
  }) {
    this.controller = controller;
    this.routeTo = routeTo;
    this.parent = parent;
  }

  /**
   * Rendering dish list on page
   * @param {{parent: HTMLElement, restaurant: object}} params
   */
  render({
    parent: parent,
    restaurant: restaurant,
  }) {
    this.parent = parent;
    this.restaurant = restaurant;
    const lists = this.restaurant.menu.map((menu) => {
      const objList = menu.dishes.map((item) => {
        return DishBlock(item);
      });
      return new List({listTitle: menu.name, objList: objList}).render();
    });
    this.parent.innerHTML = dishesList({menu: this.restaurant.menu, list: lists});

    this.settingUp();
  }

  /**
   * Setting up for render in dish-list
   */
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

  /**
   * Adding scroll-menu to dish-list
   * @param {event} e
   */
  scrollingToMenu = (e) => {
    e.preventDefault();
    const blockID = e.target.closest('a').getAttribute('href').substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  /**
   * Making navbar stick to dish-list
   */
  stickNavbar = () => {
    const menuNavbar = document.querySelector('.restaurant-nav__list');
    if (window.pageYOffset >= this.sticky) {
      menuNavbar.classList.add('sticky');
    } else {
      menuNavbar.classList.remove('sticky');
    }
  };

  /**
   * Highlighting navbar
   */
  navHighlight = () => {
    // turn off highlight
    this.menuNavsButtons.forEach((item) => {
      item.style.borderBottom = '';
    });

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

  /**
   * getting dish to open popup
   * @param {event} e
   */
  getDishForPopup = (e) => {
    const {target} = e;
    const dishId = Number(target.closest('.dish').getAttribute('id'));
    this.controller.getDish(this.restaurant.id, dishId);
  }

  /**
   * Removing dish list from page
   */
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
