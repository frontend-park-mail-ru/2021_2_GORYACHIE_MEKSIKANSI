import {View} from '../../baseView/View.js';
import Navbar from 'Components/navbar/navbar.js';
import baseProfilePage from '../baseProfilePage.hbs';
import historyPage from './historyPage.hbs';
import profileButtonsNav from 'Components/profileButtonsNav/profileButtonsNav.hbs';
import {BaseProfileView} from '../baseProfileView';


/**
 * Profile view class
 */
export class HistoryView extends BaseProfileView {
  /**
   *
   * @param {HTMLElement} parent
   * @param {Function} routeTo
   * @param {Class} controller
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
   * @param {Object} props objects relating for rendering view
   */
  render(props = {}) {
    super.render();
    const orders = [];
    props.forEach((item) => {
      orders.push(Order());
    })
    this.navbar.render();
    this.parent.innerHTML += baseProfilePage({
      pageTitle: 'История заказов',
      content: historyPage({
        orders: props,
      }),
      rightMenu: profileButtonsNav});
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
    super.remove();
    this.navbar.remove();
    this.parent.innerHTML = '';
  }
}
