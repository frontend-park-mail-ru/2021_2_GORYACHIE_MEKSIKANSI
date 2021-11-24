import {RestaurantView} from 'Views/restaurantView/restaurantView.js';
import eventBus from 'Modules/eventBus.js';
import {RestaurantEvents} from 'Events/Restaurant.js';
import RestaurantModel from 'Models/Restaurant.js';
import ProfileModel from 'Models/Profile.js';
import userStore from '../modules/reducers/userStore';
import {urls} from '../modules/urls';
import cartStore from 'Modules/reducers/cartStore';
import {RestaurantReviewsView} from '../views/restaurantReviewsView/restaurantReviewsView';
import {AuthStatus} from '../events/Auth';

/**
 * Standard restaurant controller
 */
export class RestaurantReviewsController { // TODO: добавить джсдок
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
    this.restaurantReviewsView = new RestaurantReviewsView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});

    eventBus.addEventListener(RestaurantEvents.restaurantReviewsGetSuccess, this.restaurantReviewsView.render.bind(this.restaurantReviewsView));
  }

  /**
   * rendering view of restaurant
   * @param {int} id
   */
  render(id = 0) {
    if (!userStore.getState().auth) {
      eventBus.addEventListener(AuthStatus.userLogin, this.restaurantReviewsView.refresh);
    }
    RestaurantModel.getReviews(id);
  }

  /**
   * Call Model to publish review
   * @param {number} restId
   * @param {number} value
   * @param {number} rate
   */
  publishReview = (restId, value, rate) => {
    ProfileModel.publishReviewPost(restId, value, rate);
  }

  /**
   * Removing view
   */
  remove() {
    eventBus.unsubscribe(AuthStatus.userLogin, this.restaurantReviewsView.refresh);
    this.restaurantReviewsView.remove();
  }
}
