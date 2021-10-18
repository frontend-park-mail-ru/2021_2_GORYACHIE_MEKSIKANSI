import {View} from '../baseView/View.js';
import Navbar from '../../components/navbar/navbar.js';
import homePage from './homePage.hbs';
import page from '../baseView/page.hbs';

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
    this.navbar = Navbar;
  }
  /**
   * Method that render login page in inner HTML of element
   * @param {Object} props
   */
  render(props = {}) {
    this.navbar.render();
    this.parent.insertAdjacentHTML('afterbegin', page({
      content: homePage({
        promos: [1, 2, 3],
        restaurantList: props,
      }),
    }));
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
    this.parent.innerHTML = '';
  }
}
