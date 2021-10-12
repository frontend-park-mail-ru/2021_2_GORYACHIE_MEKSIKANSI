import {getItemToCart} from '../../views/mocks.js';
import {RestaurantEvents} from '../../events/Restaurant.js';
import EventBus from '../../modules/eventBus.js';


export class Cart {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller,
  }) {
    this.controller = controller;
    this.routeTo = routeTo;
    this.parent = parent;
    this.items = [];

    EventBus.addEventListener(RestaurantEvents.restaurantCartAdd, this.addItemToCart.bind(this));
  }

  render() {
    this.parent.innerHTML = Handlebars.templates['cart.hbs']({items: this.items, restaurant: this.restaurant});
    this.sticky = this.parent.querySelector('.cart').offsetTop;
    this.footY = document.getElementById('foot').offsetTop;
    this.cartWidth = this.parent.querySelector('.cart').offsetWidth;
    console.log(this.cartWidth);
    this.settingUp();
    this.stickCart();
  }

  addItemToCart(item) {
    console.log(item);
    console.log('HERE', this.items);
    this.items.push(item);
    this.remove();
    this.render();
  }

  settingUp() {
    window.addEventListener('scroll', this.stickCart);
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
