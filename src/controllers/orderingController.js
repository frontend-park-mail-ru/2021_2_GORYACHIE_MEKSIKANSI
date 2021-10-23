import eventBus from 'Modules/eventBus.js';
import OrderingModel from 'Models/Ordering.js';
import {OrderingView} from 'Views/profileViews/orderingView/orderingView.js';
import {urls} from 'Modules/urls.js';
import store from 'Modules/store.js';
import {userStatus} from "../modules/store";
import {AuthStatus} from "../events/Auth";

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
  }

  /**
   * Rendering view
   */
  render() {
    if (store.getState().cartState.length === 0 || store.getState().cartRestaurantState === null) {
      this.routeTo(urls.home.url);
      // history.back(); // TODO: разобраться с историей при первом заходе
    } else {
      this.orderingView.render();
    }
  }

  render() {
    if (store.getState().cartState.length === 0 || store.getState().cartRestaurantState === null) {
      this.routeTo(urls.home.url);
      // history.back(); // TODO: разобраться с историей при первом заходе
    }

    if (store.getState().userState.status === userStatus.userUndefined) {
      eventBus.addEventListener(AuthStatus.userDataGot, this.show);
    } else if (store.getState().userState.status === userStatus.userAuth) {
      this.orderingView.render();
    } else {
      this.routeTo(urls.login.url);
    }
  }

  show = () => {
    eventBus.unsubscribe(AuthStatus.userDataGot, this.show);
    if (store.getState().userState.status === userStatus.userAuth) {
      this.orderingView.render();
    } else {
      this.routeTo(urls.login.url);
    }
  }

  /**
   * Removing view
   */
  remove() {
    this.orderingView.remove();
  }
}
