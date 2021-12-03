import {BaseProfileView} from '@/views/profileViews/baseProfileView';
import baseProfilePage from '@/views/profileViews/baseProfilePage.hbs';
import Navbar from '@/components/navbar/navbar';
import orderProcess from '@/components/orderProcess/orderProcess.hbs';
import profileButtonsNav from '@/components/profileButtonsNav/profileButtonsNav.hbs';
import {Order} from 'hme-design-system/src/components/contentBlock/order/order';


/**
 * Order view class
 */
export class OrderProcessView extends BaseProfileView {
  private orderId: number;
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
  }

  /**
   * Method that render login page in inner HTML of element
   * @param {Object} props objects relating for rendering view
   */
  render(props: any) {
    this.orderId = props.id;
    super.render();
    Navbar.remove();
    Navbar.render();
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
        dTime: props.time_delivery,
        order: Order(order),
      }),
      rightMenu: profileButtonsNav});
    this.updateStatus(props.status);
    // this.updateRetry = setInterval(this.callControllerToUpdate, updateStatusTimeout);
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
    Navbar.remove();
    this.parent.innerHTML = '';
  }
}
