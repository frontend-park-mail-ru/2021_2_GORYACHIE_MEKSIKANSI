import {getItemToCart} from '../../views/mocks.js';
import {RestaurantEvents} from '../../events/Restaurant.js';
import EventBus from '../../modules/eventBus.js';
import eventBus from "../../modules/eventBus.js";


export class Cart {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller,
  }) {
    this.controller = controller;
    this.routeTo = routeTo;
    this.parent = parent;
    this.items = new Map();

    EventBus.addEventListener(RestaurantEvents.restaurantCartAdd, this.addItemToCart.bind(this));
    EventBus.addEventListener(RestaurantEvents.clearCartFailed, () => {});
    EventBus.addEventListener(RestaurantEvents.clearCartSuccess, this.clearCart);
    EventBus.addEventListener(RestaurantEvents.clearDishSuccess, this.clearDish.bind(this));
  }

  render(restaurant) {
    this.restaurant = restaurant;
    this.refresh();
  }

  refresh = () => {
    this.remove();
    console.log(Array.from(this.items.values()));
    this.parent.innerHTML = Handlebars.templates['cart.hbs']({items: Array.from(this.items.values()), restaurant: this.restaurant});
    this.sticky = this.parent.querySelector('.cart').offsetTop;
    this.footY = document.getElementById('foot').offsetTop;
    this.cartWidth = this.parent.querySelector('.cart').offsetWidth;

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
    const number = target.closest('.cart__order-row').querySelector('.dish-popup__number');
    number.innerHTML = String(Number(number.innerHTML) + 1);
    const dishId = target.closest('.cart__order-row').id;
    this.items.get(Number(dishId)).itemNum += 1;
    this.controller.addDishToCart(this.restaurant.id, this.items.get(Number(dishId)).id, Number(this.items.get(Number(dishId)).itemNum));
    console.log(this.items.get(Number(dishId)).itemNum);
  }

  decreaseNumber = (e) => {
    const {target} = e;
    const number = target.closest('.cart__order-row').querySelector('.dish-popup__number');
    if (Number(number.innerHTML) === 1) {
      const dishId = target.closest('.cart__order-row').id;
      this.clearDishCall(dishId);
      return;
    }
    number.innerHTML = String(Number(number.innerHTML) - 1);
  }

  addItemToCart(item) {
    this.items.set(item.itemId, item);
    this.refresh();
  }

  clearDish(dishId) {
    this.items.delete(Number(dishId));
    this.refresh();
  }

  settingUp() {
    this.parent.querySelector('.cart__clear-button').addEventListener('click', this.clearCartCall);
    window.addEventListener('scroll', this.stickCart);
  }

  clearDishCall = (dishId) => {
    this.controller.clearDishFromCart(dishId);
  }

  clearCartCall = () => {
    this.controller.clearCart();
  }

  clearCart = () => {
    this.items.clear();
    this.refresh();
  }

  stickCart = () => {
    const cart = document.querySelector('.cart');
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
    const cart = this.parent.querySelector('.cart');
    if (cart) {
      window.removeEventListener('scroll', this.stickCart);
    }
    this.parent.innerHTML = '';
  }
}
