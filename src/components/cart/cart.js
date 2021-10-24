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

  render(restaurant) {
    this.restaurant = restaurant;
    this.refresh();
  }

  refresh = () => {
    this.remove();

    let cartBuffer = [];
    if (cartStore.getState().cart !== null && cartStore.getState().cart !== undefined) {
      cartBuffer = cartStore.getState().cart.map((item) => {
        const ingredientsCost = item.ingredients.reduce((prev, checkbox) => {
          prev += checkbox.cost;
          return prev;
        }, 0);
        let newItem = JSON.stringify(item);
        newItem = JSON.parse(newItem);
        newItem.cost = Number(item.cost) + ingredientsCost;
        return newItem;
      });
    }

    this.parent.innerHTML = cart({items: cartBuffer, restaurant: this.restaurant});
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
    let value = 0;
    if (cartStore.getState().cart !== null && cartStore.getState().cart !== undefined) {
      cartStore.getState().cart.forEach((item) => {
        const ingredientsCost = item.ingredients.reduce((prev, checkbox) => {
          prev += checkbox.cost;
          return prev;
        }, 0)
        value +=  (Number(item.cost) + ingredientsCost) * item.count;
      });
      this.parent.querySelector('.cart__summary-cost').innerHTML = String(value);
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
