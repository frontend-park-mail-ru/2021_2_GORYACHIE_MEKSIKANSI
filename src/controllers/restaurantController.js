import {RestaurantView} from '../views/restaurantView/restaurantView.js';
import eventBus from '../modules/eventBus.js';
// import User from '../modules/user.js';
// import ProfileModel from '../models/Profile.js';
import {urls} from '../modules/urls.js';
import {RestaurantEvents} from '../events/Restaurant.js';
import RestaurantModel from '../models/Restaurant.js';

export class RestaurantController {  // TODO: добавить джсдок
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
    this.restaurantView = new RestaurantView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});

    eventBus.addEventListener(RestaurantEvents.restaurantGetSuccess, this.restaurantView.render.bind(this.restaurantView));
  }

  /**
   * Rendering view
   */
  render(id = 0) {
    RestaurantModel.getRestaurant(id);
  }

  getDish(restId, dishId) {
    RestaurantModel.getDish(restId, dishId);
  }

  addDishToCart(restId, dishId) {
    RestaurantModel.addDishToCart(restId, dishId);
  }

  /**
   * Removing view
   */
  remove() {
    this.restaurantView.remove();
  }
}
