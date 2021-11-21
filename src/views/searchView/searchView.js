import {View} from '../baseView/View.js';
import Navbar from 'Components/navbar/navbar';
import page from '../baseView/page.hbs';
import {RestaurantsList} from '../../components/restaurantsList/restaurantLists'
import {PromoLine} from 'Components/promoLine/promoLine.js';

/**
 * Home view class
 */
export class SearchView extends View {
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
    this.restaurantList = new RestaurantsList();
    this.navbar = Navbar;
  }
  /**
   * Method that render home page in inner HTML of element
   * @param {Object} props
   */
  render(props = {}) {
    this.navbar.render();
    this.parent.insertAdjacentHTML('afterbegin', page({
    }));
    const title = props.title ? props.title : '';
    this.restaurantList.render({
      parent: this.parent.querySelector('.page__content'),
      restaurantsList: props.restaurants ? props.restaurants : [],
      title: 'Поиск по запросу: "' + title + '"',
      addHeader: false,
    });
  }
  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    this.navbar.remove();
    this.restaurantList.remove();
    this.parent.innerHTML = '';
  }
}
