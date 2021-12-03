import styles from './cart.scss';
import cart from './cart.hbs';
import {RestaurantEvents} from 'events/Restaurant';
import EventBus from 'modules/eventBus';
import cartStore from 'modules/reducers/cartStore';
import {ResponseEvents} from 'events/Responses';
import {CreateSnack} from 'components/snackBar/snackBar';
import {RestaurantController} from '@/controllers/restaurantController';


/**
 * Cart class
 */
export class Cart {
  private controller: RestaurantController;
  private routeTo: Function;
  private parent: HTMLElement;
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
  }

  /**
   * Removing cart from page
   */
  remove() {
    EventBus.unsubscribe(RestaurantEvents.restaurantCartUpdateSuccess, this.refresh);
    EventBus.unsubscribe(RestaurantEvents.restaurantCartUpdateFailed, this.failedToIncrease);
    const cart = this.parent.querySelector('.cart-wrapper');
    this.parent.innerHTML = '';
  }

  /**
   * Removing cart from page
   * @param {response} response
   */
 failedToIncrease = (response) => {
   if (response.status === ResponseEvents.CookiesNotFound) {
     CreateSnack({
       title: 'Войдите или зарегистрируйтесь, чтобы добавить блюдо в корзину!',
       status: 'warning',
     });
   } else {
     if ('dishesErrs' in response.body.cart) {
       response.body.cart.dishesErrs.forEach((item) => {
         CreateSnack({
           title: 'Товар ' + item.nameDish.toLowerCase() + ' доступен только в количестве ' + String(item.countAvail) + ' штук',
           status: 'warning',
         });
       });
     }
   }
 }
}
