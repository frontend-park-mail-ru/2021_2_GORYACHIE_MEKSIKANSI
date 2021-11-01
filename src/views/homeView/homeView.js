import {View} from '../baseView/View.js';
import Navbar from 'Components/navbar/navbar';
import homePage from './homePage.hbs';
import page from '../baseView/page.hbs';
import {PromoLine} from '../../components/promoLine/promoLine.js';
import {RestaurantsList} from 'Components/restaurantsList/restaurantLists';

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
    this.restaurantsList = new RestaurantsList();
    this.navbar = Navbar;
  }
  /**
   * Method that render home page in inner HTML of element
   * @param {Object} props
   */
  render(props = {}) {
    this.navbar.render();
    this.parent.insertAdjacentHTML('afterbegin', page({
      content: homePage(),
    }));
    this.promo.render(this.parent.querySelector('.home-page__promo-line-blocks'));
    this.restaurantsList.render({
      parent: this.parent.querySelector('.home-page__restaurants-list'),
      restaurantsList: props.restaurants,
    });
  }
  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    this.navbar.remove();
    this.promo.remove();
    this.restaurantsList.remove();
    this.parent.innerHTML = '';
  }
}
