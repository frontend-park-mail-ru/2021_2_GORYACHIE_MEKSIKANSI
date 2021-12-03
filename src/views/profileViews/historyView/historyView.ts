import {View} from '@/views/baseView/View';
import Navbar from '@/components/navbar/navbar';
import baseProfilePage from '@/views/profileViews/baseProfilePage.hbs';
import historyPage from './historyPage.hbs';
import profileButtonsNav from '@/components/profileButtonsNav/profileButtonsNav.hbs';
import {BaseProfileView} from '@/views/profileViews/baseProfileView';
import {DishBlock} from 'hme-design-system/src/components/dishBlock/dishBlock';
import {Order} from 'hme-design-system/src/components/contentBlock/order/order';


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

    if (props.orders) {
      props.orders.forEach((item) => {
        let statuses = {
          done: false,
          cancel: false,
          inProgress: false,
        };
        switch (item.status) {
          case 1:
            statuses = {
              ...statuses,
              cancel: true,
            };
            break;
          case 2:
            statuses = {
              ...statuses,
              inProgress: true,
            };
            break;
          case 3:
            statuses = {
              ...statuses,
              done: true,
            };
            break;
        }

        orders.push(Order({
          historyOrder: true,
          date: item.date + ', ' + item.time,
          orderId: item.id,
          addrs: item.restaurant.address.city + ', ' + item.restaurant.address.street + ', ' + item.restaurant.address.house,
          id: item.restaurant.id,
          img: item.restaurant.img,
          name: item.restaurant.name,
          items: item.cart.dishes,
          dCost: item.cart.cost.dCost,
          sumCost: item.cart.cost.sumCost,
          ...statuses,
        }));
      });
    }
    this.navbar.render();
    this.parent.innerHTML += baseProfilePage({
      pageTitle: 'История заказов',
      content: historyPage({
        orders: orders.reverse(),
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
