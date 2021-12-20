import {ResponseEvents} from '../events/Responses';
import eventBus from 'Modules/eventBus.js';
import {RestaurantEvents} from 'Events/Restaurant.js';
import cartStore, {
  addDishToCart,
  clearCart, clearCartAndAddDish,
  deleteDishFromCart,
  increaseDishInCart,
} from 'Modules/reducers/cartStore';
import {dishGet, restaurantGet} from 'Modules/api';
import {reviewsBodyMock} from '../views/mocks';
import {cartGet, getRestaurantReviews} from '../modules/api';
import {CreateSnack} from '../components/snackBar/snackBar';
import {cartActions, setCart, setPromocode} from '../modules/reducers/cartStore';
import {urls} from "../modules/urls";

/**
 * Restaurant model class
 */
class RestaurantModel {
  /**
   * Check user auth and then get restaurantList,
   * emit HomeEvents.homeGetRestaurantsSuccess
   * @param {int} id
   */
  getRestaurant(id) {
    restaurantGet({url: '/restaurant/' + id})
        .then((response) => {
            if (response.status !== ResponseEvents.OK) {
                eventBus.emitEventListener(RestaurantEvents.restaurantGetFailed, urls.home);
                CreateSnack({
                    title: response.explain,
                    status: 'red',
                });
            }
          // eventBus.emitEventListener(RestaurantEvents.restaurantGetSuccess, getRestaurantMock()); // mock from mocks
          eventBus.emitEventListener(RestaurantEvents.restaurantGetSuccess, response.body);
        })
        .catch(() => { // TODO: добавить взаимодействие с серваком...
        });
  }

  /**
   * getting dish by rest id and dish id
   * @param {int} restId
   * @param {id} dishId
   */
  getDish(restId, dishId) {
    dishGet({url: '/restaurant/' + restId + '/dish/' + dishId})
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(RestaurantEvents.restaurantPopGetSuccess, response.body);
          } else {
            CreateSnack({
              title: 'Что-то пошло не так! Не удалось получить блюдо.',
              status: 'red',
            });
          }
        })
        .catch(() => {
          // eventBus.emitEventListener(RestaurantEvents.rest, {}); // TODO: snack
        });
  }

  /**
   * Get reviews for the restaurant by api
   * @param {number} restId
   */
  getReviews(restId) {
    getRestaurantReviews(restId)
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(RestaurantEvents.restaurantReviewsGetSuccess, response.body);
          } else if (response.status === ResponseEvents.NotFound) {
            eventBus.emitEventListener(RestaurantEvents.restaurantReviewsGetSuccess, response.body);
          }
        })
        .catch(() => {
          CreateSnack({
            title: 'Не удалось получить отзывы',
            status: 'red',
          });
          eventBus.emitEventListener(RestaurantEvents.restaurantReviewsGetSuccess, {});
        });
  }

  // ////////////////////////////////////Cart Model////////////////////////////////////////////////////////////////////////

  /**
   * Adding dish to cart with it settings
   * @param {object} dishSettings
   */
  addDishToCart(dishSettings = {}) {
    cartStore.dispatch(addDishToCart(dishSettings.dish, dishSettings.restaurant));
  }


  /**
     * Adding dish to cart with it settings
     * @param {string} promocode setting string promocode to cart
     */
  setPromocodeOnCart(promocode = '') {
    cartStore.dispatch(setPromocode(promocode));
  }

  /**
   * clearCart function
   */
  clearCart() {
    cartStore.dispatch(clearCart());
  }

  /**
   * deleting dish by it itNum
   * @param {int} itNum
   */
  deleteDishFromCart(itNum) {
    cartStore.dispatch(deleteDishFromCart(itNum));
  }

  /**
   * Changing restaurant when dish from other restaurant added
   * @param {object} dishSettings
   */
  changeRestaurantAndAddDish(dishSettings = {}) {
    cartStore.dispatch(clearCartAndAddDish(dishSettings.dish, dishSettings.restaurant));
  }

  /**
   * Increasing dish in cart by it itNum
   * @param {int} itNum
   */
  increaseDishInCart(itNum) {
    cartStore.dispatch(increaseDishInCart(itNum));
  }
}

export default new RestaurantModel();
