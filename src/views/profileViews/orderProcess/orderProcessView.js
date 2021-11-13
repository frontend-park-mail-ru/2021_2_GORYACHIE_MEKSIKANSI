import {BaseProfileView} from '../baseProfileView';
import baseProfilePage from '../baseProfilePage.hbs';
import historyPage from '../historyView/historyPage.hbs';
import Navbar from 'Components/navbar/navbar.js';
import orderProcess from 'Components/orderProcess/orderProcess.hbs';
import profileButtonsNav from 'Components/profileButtonsNav/profileButtonsNav.hbs';
import cartStore from '../../../modules/reducers/cartStore';
import userStore from '../../../modules/reducers/userStore';
import {Order} from "hme-design-system/src/components/contentBlock/order/order";


/**
 * Profile view class
 */
export class OrderProcessView extends BaseProfileView {
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
    this.navbar.render();
    const order = {
      historyOrder: false,
      ...cartStore.getState().restaurant,
      items: cartStore.getState().cart,
      dCost: cartStore.getState().cost.dCost,
      sumCost: cartStore.getState().cost.sumCost,
    };
    this.parent.innerHTML += baseProfilePage({
      pageTitle: 'Активный заказ',
      content: orderProcess({
        restaurant: cartStore.getState().restaurant,
        items: cartStore.getState().cart,
        sumCost: cartStore.getState().cost.sumCost,
        dCost: cartStore.getState().cost.dCost,
        dTime: '20:50',
        order: Order(order),
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
