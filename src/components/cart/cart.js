import {RestaurantEvents} from '../../events/Restaurant.js';
import EventBus from '../../modules/eventBus.js';
import store from '../../modules/store.js';


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
    EventBus.addEventListener(RestaurantEvents.clearCartFailed, () => {}); // add the error message
    EventBus.addEventListener(RestaurantEvents.clearCartSuccess, this.clearCart);
    EventBus.addEventListener(RestaurantEvents.clearDishSuccess, this.clearDish.bind(this));
  }

  render(restaurant) {
    this.restaurant = restaurant;
    this.refresh();
  }

  refresh = () => {
    this.remove();
    this.parent.innerHTML = Handlebars.templates['cart.hbs']({items: Array.from(this.items.values()), restaurant: this.restaurant});
    this.refreshSummary();

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
    const row = target.closest('.cart__order-row');
    const dishId = row.id;
    const number = row.querySelector('.dish-popup__number');
    // increase number
    number.innerHTML = String(Number(number.innerHTML) + 1);
    const item = this.items.get(Number(dishId));
    item.itemNum += 1;
    this.controller.addDishToCart(item);
    this.refreshSummary()
  }

  decreaseNumber = (e) => {
    const {target} = e;
    const row = target.closest('.cart__order-row');
    const number = row.querySelector('.dish-popup__number');
    if (Number(number.innerHTML) === 1) {
      const dishId = row.id;
      // call the controller
      this.controller.clearDishFromCart(dishId);
      return;
    }
    const item = this.items.get(Number(row.id));
    item.itemNum -= 1;
    number.innerHTML = String(Number(number.innerHTML) - 1);
    this.refreshSummary();
  }

  refreshSummary = () => {
    let value = 0;
    this.items.forEach((item) => {
      console.log(item);
      value +=  item.itemCost * item.itemNum
    });
    this.parent.querySelector('.cart__summary-cost').innerHTML = String(value);
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

  clearCartCall = () => {
    if (this.items.size !== 0) {
      this.controller.clearCart();
    }
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
