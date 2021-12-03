import eventBus from '@/modules/eventBus';
import {RestaurantEvents} from '@/events/Restaurant';
import RestaurantModel from '@/models/Restaurant';
import ProfileModel from '@/models/Profile';
import userStore from '@/modules/reducers/userStore';
import {RestaurantReviewsView} from '@/views/restaurantReviewsView/restaurantReviewsView';
import {AuthStatus} from '@/events/Auth';

/**
 * Standard restaurant controller
 */
export class RestaurantReviewsController {
  private readonly routeTo: Function;
  private parent: HTMLElement;
  private readonly restaurantReviewsView: RestaurantReviewsView;
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
   * @param {number} id
   */
  render(id: number = 0) {
    if (!userStore.getState().auth) {
      eventBus.addEventListener(AuthStatus.userLogin, this.restaurantReviewsView.refresh);
    }
    RestaurantModel.getReviews(id);
  }

  /**
   * Call Model to publish review
   * @param {number} restId
   * @param {string} value
   * @param {number} rate
   */
  publishReview = (restId: number, value: string, rate: number): void => {
    ProfileModel.publishReviewPost(restId, value, rate);
  }

  /**
   * Call model to switch favourite restaurant
   * by rest Id
   * @param {number} restId
   */
  switchFavourite(restId) {
    ProfileModel.switchFavourite(restId);
  }

  /**
   * Removing view
   */
  remove() {
    eventBus.unsubscribe(AuthStatus.userLogin, this.restaurantReviewsView.refresh);
    this.restaurantReviewsView.remove();
  }
}
