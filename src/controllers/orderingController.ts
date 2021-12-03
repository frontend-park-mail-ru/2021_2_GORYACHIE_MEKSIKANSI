import eventBus from '@/modules/eventBus';
import {urls} from '@/modules/urls';
import userStore from '@/modules/reducers/userStore';
import {paymentMethods} from '@/modules/consts';
import {AuthStatus} from '@/events/Auth';
import {OrderingEvents} from '@/events/Ordering';
import {ProfileEvents} from '@/events/Profile';
import {OrderingView} from '@/views/profileViews/orderingView/orderingView';
import ProfileModel from '@/models/Profile';

/**
 * Standard class to ordering controller
 */
export class OrderingController {
  private readonly routeTo: Function;
  private parent: HTMLElement;
  private readonly orderingView: OrderingView;
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
    eventBus.addEventListener(ProfileEvents.userOrderCreatedSuccess, this.redirectToOrder);
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

  redirectToOrder = (id) => {
    this.routeTo('/order/' + id);
  }

  createOrder = (order) => {
    if (order.methodPay === paymentMethods.card) {
      ProfileModel.createOrderWithPay(order);
    } else {
      ProfileModel.createOrder(order);
    }
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
