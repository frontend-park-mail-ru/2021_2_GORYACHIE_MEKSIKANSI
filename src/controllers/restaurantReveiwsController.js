import {RestaurantView} from 'Views/restaurantView/restaurantView.js';
import eventBus from 'Modules/eventBus.js';
import {RestaurantEvents} from 'Events/Restaurant.js';
import RestaurantModel from 'Models/Restaurant.js';
import userStore from '../modules/reducers/userStore';
import {urls} from '../modules/urls';
import cartStore from 'Modules/reducers/cartStore';
import {RestaurantReviewsView} from "../views/restaurantReviewsView/restaurantReviewsView";

/**
 * Standard restaurant controller
 */
export class RestaurantReveiwsController { // TODO: добавить джсдок
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
    RestaurantModel.getReviews(id);
  }


  /**
   * Removing view
   */
  remove() {
    this.restaurantReviewsView.remove();
  }
}
