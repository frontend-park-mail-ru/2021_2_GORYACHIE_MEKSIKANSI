import {View} from '../baseView/View.js';
import Navbar from 'Components/navbar/navbar.js';
import homePage from './homePage.hbs';
import page from '../baseView/page.hbs';
import {PromoLine} from '../../components/promoLine/promoLine.js';

/**
 * Home view class
 */
export class HomeView extends View {
  /**
   *
   * @param {HTMLElement} parent
   * @param {Function} routeTo
   * @param {Class}controller
   */
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
    this.promo = new PromoLine();
    this.navbar = Navbar;
  }
  /**
   * Method that render login page in inner HTML of element
   * @param {Object} props
   */
  render(props = {}) {
    console.log(props);
    this.navbar.render();
    this.parent.insertAdjacentHTML('afterbegin', page({
      content: homePage({
        restaurantList: props.restaurants,
      }),
    }));
    this.promo.render(this.parent.querySelector('.home-page__promo-line-blocks'));
    this.settingUp();
  }

  /**
   * Method for setting up before rendering elements
   */
  settingUp() {
  }

  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    this.navbar.remove();
    this.promo.remove();
    this.parent.innerHTML = '';
  }
}
