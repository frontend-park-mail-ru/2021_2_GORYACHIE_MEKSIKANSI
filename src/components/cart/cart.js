 import {RestaurantEvents} from 'Events/Restaurant.js';
import EventBus from 'Modules/eventBus.js';
import store from 'Modules/store.js';
import cart from './cart.hbs'
import cartStore from "../../modules/reducers/cartStore";


export class Cart {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller,
  }) {
    this.controller = controller;
    this.routeTo = routeTo;
    this.parent = parent;

    EventBus.addEventListener(RestaurantEvents.restaurantCartUpdateSuccess, this.refresh);
    EventBus.addEventListener(RestaurantEvents.restaurantCartUpdateFailed, () => {}); // add the error explain
  }

  render() {
    this.refresh();
  }

  refresh = () => {
    this.remove();

    this.parent.innerHTML = cart({items: cartStore.getState().cart, restaurant: cartStore.getState().restaurant});
    this.refreshSummary();

    this.sticky = this.parent.querySelector('.cart-wrapper').offsetTop;
    this.footY = document.getElementById('foot').offsetTop;
    this.cartWidth = this.parent.querySelector('.cart-wrapper').offsetWidth;

    const rows = this.parent.querySelectorAll('.cart__order-row');
    if (rows) {
      rows.forEach((item) => {
        item.querySelector('.plus').addEventListener('click', this.increaseNumber);
        item.querySelector('.minus').addEventListener('click', this.decreaseNumber);
      });
    }

    this.settingUp();
    this.stickCart();
  }

  increaseNumber = (e) => {
    const {target} = e;
    const itNum = target.closest('.cart__order-row').id;
    this.controller.increaseDishInCart(Number(itNum));
  }

  decreaseNumber = (e) => {
    const {target} = e;
    const itNum = target.closest('.cart__order-row').id;
    this.controller.deleteDishFromCart(Number(itNum));
  }

  refreshSummary = () => {
    if (cartStore.getState().cart !== null && cartStore.getState().cart !== undefined) {
      this.parent.querySelector('.cart__summary-cost').innerHTML = String(cartStore.getState().cost.sumCost);
    }
  }

  settingUp() {
    this.parent.querySelector('.cart__clear-button').addEventListener('click', this.controller.clearCart);
    window.addEventListener('scroll', this.stickCart);
  }

  stickCart = () => {
    const cart = document.querySelector('.cart-wrapper');
    if (window.pageYOffset + 75 + cart.offsetHeight >= this.footY) {
      cart.style.top = String(this.footY - (window.pageYOffset + 75 + cart.offsetHeight)) + 'px';
      this.cartWidth = cart.offsetWidth;
    } else if (window.pageYOffset + 75 >= this.sticky) {
      cart.style.top = String(0) + 'px';
      cart.classList.add('cart__sticky');
      cart.style.width = this.cartWidth + 'px';
    } else {
      cart.classList.remove('cart__sticky');
      cart.style.width = '';
      this.cartWidth = cart.offsetWidth;
    }
  }

  remove() {
    const cart = this.parent.querySelector('.cart-wrapper');
    if (cart) {
      window.removeEventListener('scroll', this.stickCart);
    }
    this.parent.innerHTML = '';
  }
}
