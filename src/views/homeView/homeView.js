import {View} from '../baseView/View.js';
import Navbar from 'Components/navbar/navbar';
import homePage from './homePage.hbs';
import page from '../baseView/page.hbs';
import {RestaurantsList} from 'Components/restaurantsList/restaurantLists';
import {PromoLine} from 'Components/promoLine/promoLine.js';
import userStore from "../../modules/reducers/userStore";

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
    this.recommendList = new RestaurantsList();
    this.navbar = Navbar;
  }
  /**
   * Method that render home page in inner HTML of element
   * @param {Object} props
   */
  render(props = {}) {
    console.log(props);
    this.navbar.render();
    this.parent.insertAdjacentHTML('afterbegin', page({
      content: homePage(),
    }));
    this.promo.render({
      parent: this.parent.querySelector('.home-page__promo-line-blocks'),
      props: props.restaurants.promo_code,
    });
    if (userStore.getState().auth && props.recommends?.restaurants) {
      this.recommendList.render({
        parent: this.parent.querySelector('.home-page__restaurants-list'),
        restaurantsList: props.recommends.restaurants,
        title: 'Рекомендации',
      })
    }
    this.restaurantsList.render({
      parent: this.parent.querySelector('.home-page__restaurants-list'),
      restaurantsList: props.restaurants.restaurants_info,
      title: 'Рестораны',
    });
  }
  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    this.navbar.remove();
    this.promo.remove();
    this.restaurantsList.remove();
    this.recommendList.remove();
    this.parent.innerHTML = '';
  }
}
