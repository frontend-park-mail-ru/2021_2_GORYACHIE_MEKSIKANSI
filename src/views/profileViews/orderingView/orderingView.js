import {View} from '../../baseView/View.js';
import Navbar from '../../../components/navbar/navbar.js';
import store from '../../../modules/store.js';
import {urls} from '../../../modules/urls.js';

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

    this.sumCost = 0;
    this.sumCost = cart.reduce((prev, item) => {
      prev += item.cost * item.num;
      return prev;
    }, 0);
    this.sumCost += restaurant.dCost;

    const template = Handlebars.templates['baseProfilePage.hbs'];
    this.parent.innerHTML += template({
      pageTitle: 'Оформление заказа',
      content: Handlebars.templates['orderDelivery.hbs']({
        restaurant: store.getState().cartRestaurantState,
        items: store.getState().cartState,
        sumCost: this.sumCost,
      }),
      rightMenu: Handlebars.templates['orderSummary.hbs']({
        sumCost: this.sumCost,
      })});

    this.summaryWidth = document.querySelector('.cart-order-summary').offsetWidth;
    window.addEventListener('scroll', this.stickSummary);
    this.parent.querySelector('.cart-order-summary__pay-button').addEventListener('click', this.confirm);

    this.parent.querySelector('.cart-order-summary__pay-button').addEventListener('click', this.showConfirm);

    document.querySelector('.footer').style.marginTop = '0';
    this.sticky = this.parent.querySelector('.cart-order-summary').offsetTop;
    this.stickSummary();


  }

  stickSummary = () => {
    const summary = document.querySelector('.cart-order-summary');
    this.footY = Number(document.querySelector('.cart-order').offsetTop) + Number(document.querySelector('.cart-order').offsetHeight);
    if (window.pageYOffset + 75 + summary.offsetHeight >= this.footY) {
      summary.style.top = String(this.footY - (window.pageYOffset + 75 + summary.offsetHeight)) + 'px';
      this.summaryWidth = summary.offsetWidth;
    } else if (window.pageYOffset + 75 >= this.sticky) {
      summary.style.top = String(0) + 'px';
      summary.classList.add('cart-order-summary-sticky');
      summary.style.width = this.summaryWidth + 'px';
    } else {
      summary.classList.remove('cart-order-summary-sticky');
      summary.style.width = '';
      this.cartWidth = summary.offsetWidth;
    }
  }

  confirm = () => {
    if (store.getState().userState.auth) {
      // confirm
    } else {
      this.routeTo(urls.login.url);
    }
  }

  showConfirm = () => {
    if (this.parent.querySelector('.card').checked) {
      this.confirmDiv = document.createElement('div');
      this.confirmDiv.innerHTML = Handlebars.templates['confirmPopup.hbs']({sumCost: this.sumCost});
      this.parent.appendChild(this.confirmDiv);
      document.body.style.overflowY = 'hidden';
      this.confirmDiv.querySelector('.confirm-popup__close-button').addEventListener('click', this.removeConfirm);
    }
  }

  removeConfirm = () => {
    if (this.confirmDiv) {
      this.confirmDiv.querySelector('.confirm-popup__close-button').removeEventListener('click', this.removeConfirm);
      this.confirmDiv.remove();
    }
    document.body.style.overflowY = 'scroll';
  }

  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    this.navbar.remove();

    this.removeConfirm();
    this.parent.innerHTML = '';
  }
}