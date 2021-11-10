import {OrderProcessView} from '../views/profileViews/orderProcess/orderProcessView';
import userStore from '../modules/reducers/userStore';
import eventBus from '../modules/eventBus';
import {AuthStatus} from '../events/Auth';
import {urls} from '../modules/urls';

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
  }

  /**
   * Rendering view
   */
  render() {
    if (!userStore.getState().auth) {
      eventBus.addEventListener(AuthStatus.userLogin, this.show);
      eventBus.addEventListener(AuthStatus.notAuth, this.redirect);
    } else {
      this.orderProcessView.render();
    }
  }

  show = () => {
    this.orderProcessView.render();
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
    this.orderProcessView.remove();
  }
}
