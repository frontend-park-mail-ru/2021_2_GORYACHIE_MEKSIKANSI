

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
  }

  render() {
    this.parent.innerHTML = Handlebars.templates['cart.hbs']();
    this.sticky = this.parent.querySelector('.cart').offsetTop;
    this.cartWidth = this.parent.querySelector('.cart').offsetWidth;
    console.log(this.cartWidth);
    this.settingUp();
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