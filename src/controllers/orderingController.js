import eventBus from '../modules/eventBus.js';
import OrderingModel from 'Models/Ordering.js';
import {OrderingView} from 'Views/profileViews/orderingView/orderingView.js';
import {urls} from '../modules/urls.js';
import store from '../modules/store.js';

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

  /**
   * Removing view
   */
  remove() {
    this.orderingView.remove();
  }
}
