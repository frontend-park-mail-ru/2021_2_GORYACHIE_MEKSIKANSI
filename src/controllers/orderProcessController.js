import {OrderProcessView} from '../views/profileViews/orderProcess/orderProcessView';
import userStore from '../modules/reducers/userStore';
import eventBus from '../modules/eventBus';
import {AuthStatus} from '../events/Auth';
import {urls} from '../modules/urls';
import ProfileModel from '../models/Profile';
import {ProfileEvents} from '../events/Profile';

/**
 * Standard calss to ordering process controller
 */
export class OrderProcessController {
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
    this.orderProcessView = new OrderProcessView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this,
    });
    eventBus.addEventListener(ProfileEvents.userOrderGetSuccess, this.orderProcessView.render.bind(this.orderProcessView));
    eventBus.addEventListener(ProfileEvents.userOrderGetSuccessForStatus, this.orderProcessView.updateStatus.bind(this.orderProcessView));
  }

  /**
   * Rendering view
   * @param {number | string} orderId
   */
  render(orderId) {
    if (!userStore.getState().auth) {
      this.stashOrderId = orderId;
      eventBus.addEventListener(AuthStatus.userLogin, this.show.bind(orderId));
      eventBus.addEventListener(AuthStatus.notAuth, this.redirect);
    } else {
      ProfileModel.getOrder(orderId);
    }
  }

  show = () => {
    if (this.stashOrderId) {
      ProfileModel.getOrder(this.stashOrderId);
    } else {
      this.routeTo(urls.home);
    }
  }

  /**
   * Function for rerendering status page with new data
   * @param {string | number} orderId
   */
  callModelToGetOrder(orderId) {
    ProfileModel.getOrderForStatus(orderId);
  }

  redirect = () => {
    this.routeTo(urls.home);
  }

  /**
   * Removing view
   */
  remove() {
    eventBus.unsubscribe(AuthStatus.userLogin, this.show);
    eventBus.unsubscribe(AuthStatus.notAuth, this.redirect);
    this.orderProcessView.remove();
  }
}
