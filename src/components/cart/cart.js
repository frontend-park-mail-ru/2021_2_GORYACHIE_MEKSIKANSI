import {getItemToCart} from '../../views/mocks.js';


export class Cart {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller,
    restaurantId: id,
  }) {
    this.controller = controller;
    this.routeTo = routeTo;
    this.parent = parent;
    this.restId = id;
    this.items = [];
    this.addItemToCart(getItemToCart());
    this.addItemToCart(getItemToCart());
    this.addItemToCart(getItemToCart());
  }

  render() {
    this.parent.innerHTML = Handlebars.templates['cart.hbs']({items: this.items});
    this.sticky = this.parent.querySelector('.cart').offsetTop;
    this.cartWidth = this.parent.querySelector('.cart').offsetWidth;
    console.log(this.cartWidth);
    this.settingUp();
  }

  addItemToCart(item) {
    this.items.push(item);
    this.remove();
    this.render();
  }

  settingUp() {
    window.addEventListener('scroll', this.stickCart);
  }

  stickCart = () => {
    const cart = document.querySelector('.cart');
    if (window.pageYOffset + 75 >= this.sticky) {
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
