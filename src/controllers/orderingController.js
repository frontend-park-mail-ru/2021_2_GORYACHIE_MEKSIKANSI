import eventBus from 'Modules/eventBus.js';
import OrderingModel from 'Models/Ordering.js';
import {OrderingView} from 'Views/profileViews/orderingView/orderingView.js';
import {urls} from 'Modules/urls.js';
import store from 'Modules/store.js';
import {AuthStatus} from "../events/Auth";
import cartStore from "../modules/reducers/cartStore";
import userStore from "../modules/reducers/userStore";

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
    if (cartStore.getState().cart.length === 0 || cartStore.getState().restaurant.id === null) {
      this.routeTo(urls.home.url);
      return;
      // history.back(); // TODO: разобраться с историей при первом заходе
    }

    if (!userStore.getState().auth) {
      eventBus.addEventListener(AuthStatus.userLogin, this.show);
      eventBus.addEventListener(AuthStatus.notAuth, this.redirect);
    } else {
      this.orderingView.render();
    }
  }

  show = () => {
    this.orderingView.render();
  }

  redirect = () => {
    this.routeTo(urls.home.url);
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
