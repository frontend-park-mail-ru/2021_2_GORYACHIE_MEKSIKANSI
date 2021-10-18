import {View} from '../../baseView/View.js';
import Navbar from '../../../components/navbar/navbar.js';
import store from '../../../modules/store.js';

/**
 * Profile view class
 */
export class OrderingView extends View {
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

    const cart = store.getState().cartState;
    const restaurant = store.getState().cartRestaurantState;

    let sumCost = 0;
    sumCost = cart.reduce((prev, item) => {
      prev += item.cost * item.num;
      return prev;
    }, 0);
    sumCost += restaurant.dCost;

    const template = Handlebars.templates['baseProfilePage.hbs'];
    this.parent.innerHTML += template({
      pageTitle: 'Оформление заказа',
      content: Handlebars.templates['orderDelivery.hbs']({
        restaurant: store.getState().cartRestaurantState,
        items: store.getState().cartState,
        sumCost: sumCost,
      }),
      rightMenu: Handlebars.templates['orderSummary.hbs']({
        sumCost: sumCost,
      })});

    window.addEventListener('scroll', this.stickSummary);

    document.querySelector('.footer').style.marginTop = '0';
    this.sticky = this.parent.querySelector('.cart-order-summary').offsetTop;
  }

  stickSummary = () => {
    const summary = document.querySelector('.cart-order-summary');
    this.footY = Number(document.querySelector('.cart-order').offsetTop) + Number(document.querySelector('.cart-order').offsetHeight);
    if (window.pageYOffset + 75 + summary.offsetHeight >= this.footY) {
      summary.style.top = String(this.footY - (window.pageYOffset + 75 + summary.offsetHeight)) + 'px';
      this.cartWidth = summary.offsetWidth;
    } else if (window.pageYOffset + 75 >= this.sticky) {
      summary.style.top = String(0) + 'px';
      summary.classList.add('cart-order-summary-sticky');
      summary.style.width = this.cartWidth + 'px';
    } else {
      summary.classList.remove('cart-order-summary-sticky');
      summary.style.width = '';
      this.cartWidth = summary.offsetWidth;
    }
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
