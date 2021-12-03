import userStore from '@/modules/reducers/userStore';
import {urls} from '@/modules/urls';
import cartStore from '@/modules/reducers/cartStore';
import eventBus from '@/modules/eventBus';
import {RestaurantEvents} from '@/events/Restaurant';
import {RestaurantView} from '@/views/restaurantView/restaurantView';
import RestaurantModel from '@/models/Restaurant';
import ProfileModel from '@/models/Profile';

/**
 * Standard restaurant controller
 */
export class RestaurantController {
  private readonly routeTo: Function;
  private parent: HTMLElement;
  private readonly restaurantView: RestaurantView;
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
