import {RestaurantView} from 'Views/restaurantView/restaurantView.js';
import eventBus from 'Modules/eventBus.js';
import {RestaurantEvents} from 'Events/Restaurant.js';
import RestaurantModel from 'Models/Restaurant.js';
import store, {actions} from 'Modules/store.js';

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
    console.log(dishSettings.restaurant, store.getState().cartRestaurantState);
    const cartRestaurant = store.getState().cartRestaurantState;
    if (cartRestaurant === null || cartRestaurant.id === dishSettings.restaurant.id) {
      RestaurantModel.addDishToCart(dishSettings);
    } else {
      this.stash = dishSettings;
      this.restaurantView.continueOrdering(dishSettings.restaurant, cartRestaurant);
    }
  }

  increaseDishInCart(dishSettings) {
    const dish = store.getState().cartState.find((item) => {
      return Number(item.cartId) === Number(dishSettings.dishId);
    });
    if (dish) {
      RestaurantModel.addDishToCart({
        restId: dishSettings.restId,
        dish: dish,
      });
    }
  }

  clearCart() {
    RestaurantModel.clearCart();
  }

  deleteDishFromCart(dishId) {
    RestaurantModel.clearDishFromCart(dishId);
  }

  /**
   * Removing view
   */
  remove() {
    this.restaurantView.remove();
  }
}
