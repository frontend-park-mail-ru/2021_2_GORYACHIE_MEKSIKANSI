import {RestaurantView} from 'Views/restaurantView/restaurantView.js';
import eventBus from 'Modules/eventBus.js';
import {RestaurantEvents} from 'Events/Restaurant.js';
import RestaurantModel from 'Models/Restaurant.js';
import ProfileModel from 'Models/Profile.js';
import userStore from '../modules/reducers/userStore';
import {urls} from '../modules/urls';
import cartStore from 'Modules/reducers/cartStore';

/**
 * Standard restaurant controller
 */
export class RestaurantController { // TODO: добавить джсдок
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
    eventBus.addEventListener(RestaurantEvents.restaurantGetFailed, this.routeTo);
    eventBus.addEventListener(RestaurantEvents.restaurantGetSuccess, this.restaurantView.render.bind(this.restaurantView));
  }

  /**
   * rendering view of restaurant
   * @param {int} id
   */
  render(id = 0) {
    RestaurantModel.getRestaurant(id);
  }



  /**
   * getting dish by rest id and dish id
   * @param {int} restId
   * @param {int} dishId
   */
  getDish(restId, dishId) {
    RestaurantModel.getDish(restId, dishId);
  }

  /**
   * continue adding func
   */
  continueAdding() {
    if (this.stash) {
      RestaurantModel.changeRestaurantAndAddDish(this.stash);
    }
  }

  /**
   * addin dish to cart controller
   * @param {object} dishSettings
   */
  addDishToCart(dishSettings = {}) {
    if (!userStore.getState().auth) {
      this.routeTo(urls.login);
      return;
    }

    const cartRestaurant = cartStore.getState().restaurant;
    if (cartRestaurant.id === -1 || cartRestaurant.id === dishSettings.restaurant.id) {
      RestaurantModel.addDishToCart(dishSettings);
    } else {
      this.stash = dishSettings;
      this.restaurantView.continueOrdering(dishSettings.restaurant, cartRestaurant);
    }
  }

  /**
   * increasing dish in cart controller
   * @param {int} itNum
   */
  increaseDishInCart(itNum) {
    const dish = cartStore.getState().cart.find((item) => {
      return Number(item.itNum) === Number(itNum);
    });
    if (dish) {
      RestaurantModel.increaseDishInCart(itNum);
    }
  }

  /**
   * Call model to switch favourite restaurant
   * by restId
   * @param {number} restId
   */
  switchFavourite(restId) {
    ProfileModel.switchFavourite(restId);
  }

  /**
   * clearing cart controller
   */
  clearCart() {
    RestaurantModel.clearCart();
  }

  /**
   * deleting dish from cart by itNum
   * @param {int} itNum
   */
  deleteDishFromCart(itNum) {
    RestaurantModel.deleteDishFromCart(itNum);
  }

  /**
   * Removing view
   */
  remove() {
    this.restaurantView.remove();
  }
}
