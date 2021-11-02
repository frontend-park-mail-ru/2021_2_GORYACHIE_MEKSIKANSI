import {View} from '../../baseView/View.js';
import Navbar from 'Components/navbar/navbar.js';
import {urls} from 'Modules/urls.js';
import EventBus from 'Modules/eventBus.js';
import {OrderingEvents} from "Events/Ordering.js";
import baseProfilePage from '../baseProfilePage.hbs';
import Address from 'Modules/lsAddress.js';
import orderDelivery from 'Components/cartOrder/orderDelivery.hbs';
import orderSummary from 'Components/cartOrder/orderSummary.hbs';
import confirmPopup from 'Components/confirmPopup/confirmPopup.hbs'
import userStore from "Modules/reducers/userStore";
import cartStore from "Modules/reducers/cartStore";
import {BaseProfileView} from "../baseProfileView";

/**
 * Profile view class
 */
export class OrderingView extends BaseProfileView {
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
    EventBus.addEventListener(OrderingEvents.addressRefreshed, this.refresh);
    this.navbar.render();

    this.parent.innerHTML += baseProfilePage({
      pageTitle: 'Оформление заказа',
      content: orderDelivery({
        restaurant: cartStore.getState().restaurant,
        items: cartStore.getState().cart,
        sumCost: cartStore.getState().cost.sumCost,
        dCost: cartStore.getState().cost.dCost,
        address: userStore.getState().address.fullAddress
      }),
      rightMenu: orderSummary({
        sumCost: cartStore.getState().cost.sumCost,
      })});
    this.summaryWidth = document.querySelector('.cart-order-summary').offsetWidth;
    window.addEventListener('scroll', this.stickSummary);
    this.parent.querySelector('.cart-order-summary__pay-button').addEventListener('click', this.confirm);

    this.parent.querySelector('.cart-order-summary__pay-button').addEventListener('click', this.showConfirm);

    this.sticky = this.parent.querySelector('.cart-order-summary').offsetTop;
    this.stickSummary();
  }

  refresh = () => {
    this.remove();
    this.render();
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
      this.summaryWidth = summary.offsetWidth;
    }
  }

  confirm = () => {
    if (userStore.getState().auth) {
      // confirm
    } else {
      this.routeTo(urls.login.url);
    }
  }

  showConfirm = () => {
    if (this.parent.querySelector('.card').checked) {
      this.confirmDiv = document.createElement('div');
      this.confirmDiv.innerHTML = confirmPopup({sumCost: cartStore.getState().cost.sumCost});
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
    super.remove();
    this.navbar.remove();
    window.removeEventListener('scroll', this.stickSummary);

    this.removeConfirm();
    this.parent.innerHTML = '';
  }
}
