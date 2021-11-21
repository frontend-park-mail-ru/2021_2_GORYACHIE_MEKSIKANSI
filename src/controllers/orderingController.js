import eventBus from 'Modules/eventBus.js';
import OrderingModel from 'Models/Ordering.js';
import {OrderingView} from 'Views/profileViews/orderingView/orderingView.js';
import {urls} from 'Modules/urls.js';
import {AuthStatus} from 'Events/Auth';
import cartStore from 'Modules/reducers/cartStore';
import userStore from 'Modules/reducers/userStore';
import {OrderingEvents} from '../events/Ordering';


/**
 * Standard class to ordering controller
 */
export class OrderingController {
  /**
   * Constructor for controller
   * @param {HTMLElement} parent parent html element
   * @param {Function} routeTo router function for routing
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo,
  }) {
    this.routeTo = routeTo;
    this.parent = parent;
    this.orderingView = new OrderingView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this,
    });
    eventBus.addEventListener(OrderingEvents.paymentSuccess, this.routeTo);
  }

  /**
   * Rendering view
   */
  render() {
    if (!userStore.getState().auth) {
      eventBus.addEventListener(AuthStatus.userLogin, this.show);
      eventBus.addEventListener(AuthStatus.notAuth, this.redirect);
    } else {
      this.show();
    }
  }

  show = () => {
    this.orderingView.render();
  }

  redirect = () => {
    this.routeTo(urls.home);
  }

  makePay = () => {
    OrderingModel.requestPay();
  }

  /**
   * Removing view
   */
  remove() {
    eventBus.unsubscribe(AuthStatus.userLogin, this.show);
    eventBus.unsubscribe(AuthStatus.notAuth, this.redirect);
    this.orderingView.remove();
  }
}
