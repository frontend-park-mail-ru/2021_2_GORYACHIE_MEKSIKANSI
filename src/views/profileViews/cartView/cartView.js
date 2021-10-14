import {View} from '../../baseView/View.js';
import Navbar from 'Components/navbar/navbar.js';
import orderDelivery from 'Components/cartOrder/orderDelivery.hbs'
import orderSummary from 'Components/cartOrder/orderSummary.hbs'
import baseProfilePage from '../baseProfilePage.hbs'

const orders =
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
  };

/**
 * Profile view class
 */
export class CartView extends View {
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
    this.parent.innerHTML += baseProfilePage({
      pageTitle: 'Оформление заказа',
      content: orderDelivery(orders),
      rightMenu: orderSummary({})});
    document.querySelector('.footer').style.marginTop = '0';
  }

  /**
   * Method calling by
   * @param {string} event
   */
  _submitListener(event) {}

  /**
   * Method for setting up before rendering elements
   */
  settingUp() {
    const form = document.getElementById('form_submit');
    form.addEventListener('click', this._submitListener.bind(this));
  }

  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    this.navbar.remove();
    this.parent.innerHTML = '';
  }
}