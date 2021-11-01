import {RestaurantView} from 'Views/restaurantView/restaurantView.js';
import eventBus from 'Modules/eventBus.js';
import {RestaurantEvents} from 'Events/Restaurant.js';
import RestaurantModel from 'Models/Restaurant.js';
<<<<<<< Updated upstream
import cartStore from "../modules/reducers/cartStore";
import userStore from "../modules/reducers/userStore";
import {urls} from "../modules/urls";

=======
import cartStore from "Modules/reducers/cartStore";
>>>>>>> Stashed changes
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

  continueAdding() {
    if (this.stash) {
      RestaurantModel.changeRestaurantAndAddDish(this.stash);
    }
  }

  addDishToCart(dishSettings = {}) {
    if (!userStore.getState().auth) {
      this.routeTo(urls.login.url);
    }

    const cartRestaurant = cartStore.getState().restaurant;
    if (cartRestaurant.id === -1 || cartRestaurant.id === dishSettings.restaurant.id) {
      RestaurantModel.addDishToCart(dishSettings);
    } else {
      this.stash = dishSettings;
      this.restaurantView.continueOrdering(dishSettings.restaurant, cartRestaurant);
    }
  }

  increaseDishInCart(itNum) {
    const dish = cartStore.getState().cart.find((item) => {
      return Number(item.itNum) === Number(itNum);
    });
    if (dish) {
      RestaurantModel.increaseDishInCart(itNum);
    }
  }

  clearCart() {
    RestaurantModel.clearCart();
  }

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
