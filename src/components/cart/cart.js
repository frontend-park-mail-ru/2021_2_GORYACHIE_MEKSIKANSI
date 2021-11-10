import {RestaurantEvents} from 'Events/Restaurant.js';
import EventBus from 'Modules/eventBus.js';
import cart from './cart.hbs';
import cartStore from 'Modules/reducers/cartStore.js';
import {SnackBar} from 'Components/snackBar/snackBar.js';
import {ResponseEvents} from 'Events/Responses.js';


/**
 * Cart class
 */
export class Cart {
  /**
   * Constructor for cart class
   *
   * @param {{parent: HTMLElement, routeTo: object, controller: Class}} params
   *
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller,
  }) {
    this.controller = controller;
    this.routeTo = routeTo;
    this.parent = parent;
  }


  /**
   * Render for cart class
   *
   */
  render() {
    EventBus.addEventListener(RestaurantEvents.restaurantCartUpdateSuccess,
        this.refresh);
    EventBus.addEventListener(RestaurantEvents.restaurantCartUpdateFailed,
        this.failedToIncrease);
    this.parent.innerHTML = cart({
      items: cartStore.getState().cart,
      restaurant: cartStore.getState().restaurant,
    });
    this.refreshSummary();

    this.sticky = this.parent.querySelector('.cart-wrapper').offsetTop;
    this.footY = document.getElementById('foot').offsetTop;
    this.cartWidth = this.parent.querySelector('.cart-wrapper').offsetWidth;

    const rows = this.parent.querySelectorAll('.cart__order-row');
    if (rows) {
      rows.forEach((item) => {
        const plus = item.querySelector('.plus');
        if (plus) {
          plus.addEventListener('click', this.increaseNumber);
        }
        const minus = item.querySelector('.minus');
        if (minus) {
          minus.addEventListener('click', this.decreaseNumber);
        }
      });
    }

    this.settingUp();
    this.stickCart();
  }

  /**
   * Rerendering cart when update comes
   *
   */
  refresh = () => {
    this.remove();
    this.render();
  }

  /**
   * Increasing amount of dish in cart
   *
   * @param {event} e
   *
   */
  increaseNumber = (e) => {
    const {target} = e;
    const itNum = target.closest('.cart__order-row').id;
    this.controller.increaseDishInCart(Number(itNum));
  }

  /**
   * Decreasing amount of dish in cart
   *
   * @param {event} e
   *
   */
  decreaseNumber = (e) => {
    const {target} = e;
    const itNum = target.closest('.cart__order-row').id;
    this.controller.deleteDishFromCart(Number(itNum));
  }

  /**
   * Refreshing summary price in cart
   *
   */
  refreshSummary = () => {
    if (cartStore.getState().cart !== null && cartStore.getState().cart !== undefined && cartStore.getState().cart.length > 0) {
      this.parent.querySelector('.cart__summary-cost').innerHTML = String(cartStore.getState().cost.sumCost);
    }
  }

  /**
   * Adding render settings for cart
   *
   */
  settingUp() {
    this.parent.querySelector('.cart__clear-button').addEventListener('click', this.controller.clearCart);
    window.addEventListener('scroll', this.stickCart);
  }

  /**
   * Function to make cart sticky
   *
   */
  stickCart = () => {
    console.log('HERE');
    const cart = document.querySelector('.cart-wrapper');
    if (window.pageYOffset + 200 + cart.offsetHeight >= this.footY) {
      cart.style.top = String(this.footY - (window.pageYOffset + 200 + cart.offsetHeight)) + 'px';
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

  /**
   * Removing cart from page
   */
  remove() {
    EventBus.unsubscribe(RestaurantEvents.restaurantCartUpdateSuccess, this.refresh);
    EventBus.unsubscribe(RestaurantEvents.restaurantCartUpdateFailed, this.failedToIncrease);
    const cart = this.parent.querySelector('.cart-wrapper');
    if (cart) {
      window.removeEventListener('scroll', this.stickCart);
    }
    this.parent.innerHTML = '';
  }

  /**
   * Removing cart from page
   * @param {response} response
   */
 failedToIncrease = (response) => {
   let snack;
   if (response.status === ResponseEvents.CookiesNotFound) {
     snack = new SnackBar({
       message: 'Войдите или зарегистрируйтесь, чтобы добавить блюдо в корзину!',
       status: 'warn',
       position: 'tr',
       width: '500px',
       fixed: true,
     });
     snack.settingUp();
     snack.Open();
   } else {
     if ('dishesErrs' in response.body.cart) {
       response.body.cart.dishesErrs.forEach((item) => {
         snack = new SnackBar({
           message: 'Товар ' + item.nameDish.toLowerCase() + ' доступен только в количестве ' + String(item.countAvail) + ' штук',
           status: 'warning',
           position: 'tr',
           width: '500px',
           fixed: true,
         });
         snack.settingUp();
         snack.Open();
       });
     }
   }
 }
}
