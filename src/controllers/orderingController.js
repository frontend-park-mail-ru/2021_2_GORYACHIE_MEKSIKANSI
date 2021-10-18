import eventBus from '../modules/eventBus.js';
import OrderingModel from '../models/Ordering.js';
import {OrderingView} from '../views/profileViews/orderingView/orderingView.js';

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
    this.orderingView.render();
  }

  /**
   * Removing view
   */
  remove() {
    this.orderingView.remove();
  }
}
