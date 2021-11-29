import {BaseProfileView} from '../baseProfileView';
import baseProfilePage from '../baseProfilePage.hbs';
import historyPage from '../historyView/historyPage.hbs';
import Navbar from 'Components/navbar/navbar.js';
import orderProcess from 'Components/orderProcess/orderProcess.hbs';
import profileButtonsNav from 'Components/profileButtonsNav/profileButtonsNav.hbs';
import cartStore from '../../../modules/reducers/cartStore';
import userStore from '../../../modules/reducers/userStore';
import {Order} from 'hme-design-system/src/components/contentBlock/order/order';
import {updateStatusTimeout} from '../../../modules/consts';


/**
 * Order view class
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
    this.orderId = props.id;
    super.render();
    this.navbar.render();
    const order = {
      historyOrder: false,
      ...props.restaurant,
      items: props.cart.dishes,
      dCost: props.cart.cost.dCost,
      sumCost: props.cart.cost.sumCost,
    };
    this.parent.innerHTML += baseProfilePage({
      pageTitle: 'Активный заказ',
      content: orderProcess({
        restaurant: props.restaurant,
        date: props.date + ', ' + props.time,
        id: props.id,
        sumCost: props.cart.cost.sumCost,
        dCost: props.cart.cost.dCost,
        dTime: '20:50',
        order: Order(order),
      }),
      rightMenu: profileButtonsNav});
    this.updateStatus(props.status);
    this.updateRetry = setInterval(this.callControllerToUpdate, updateStatusTimeout);
  }

  callControllerToUpdate = () => {
    this.controller.callModelToGetOrder(this.orderId);
  }

  /**
   * Method for visual updating of status
   * @param {number} status
   */
  updateStatus = (status) => {
    const statuses = this.parent.querySelectorAll('.status');
    statuses.forEach((item) => {
      item.classList.remove('order-process__do', 'order-process__wait', 'order-process__done');
      if (item.id < status + 1) {
        item.classList.add('order-process__done');
      } else if (item.id > status + 1) {
        item.classList.add('order-process__wait');
      } else {
        item.classList.add('order-process__do');
      }
    });
    if (status === 4) {
      clearInterval(this.updateRetry);
    }
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
    clearInterval(this.updateRetry);
    super.remove();
    this.navbar.remove();
    this.parent.innerHTML = '';
  }
}
