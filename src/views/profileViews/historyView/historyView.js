import {View} from '../../baseView/View.js';
import Navbar from '../../../components/navbar/navbar.js';


const orders = [
  {
    restaurantTitle: 'МакДоналдс',
    date: '2 октября 2021, 14:07',
    address: 'Россия, Москва, ул. Пушкина д. 14к2',
    items: [
      {
        name: 'МакНаггетс',
        num: 3,
        cost: 100,
      },
      {
        name: 'МакНаггетс',
        num: 1,
        cost: 100,
      },
      {
        name: 'МакНаггетс',
        num: 1,
        cost: 100,
      },
    ],
    deliveryCost: 123,
    status: true,
    summaryCost: 500,
  },
  {
    restaurantTitle: 'КФС',
    date: '2 октября 2021, 14:07',
    address: 'Россия, Москва, ул. Пушкина д. 14к2',
    items: [
      {
        name: 'МакНаггетс',
        num: 1,
        cost: 100,
      },
      {
        name: 'МакНаггетс',
        num: 1,
        cost: 100,
      },
      {
        name: 'МакНаггетс',
        num: 1,
        cost: 100,
      },
    ],
    deliveryCost: 400,
    status: false,
    summaryCost: 500,
  },
];

/**
 * Profile view class
 */
export class HistoryView extends View {
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
    this.navbar.render();
    const template = Handlebars.templates['baseProfilePage.hbs'];
    this.parent.innerHTML += template({
      pageTitle: 'История заказов',
      content: Handlebars.templates['historyPage.hbs']({
        orders: orders,
      }),
      rightMenu: Handlebars.templates['profileButtonsNav.hbs']});
    document.querySelector('.footer').style.marginTop = '0';
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
