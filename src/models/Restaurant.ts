import {dishGet, restaurantGet} from '@/modules/api';
import {getRestaurantReviews} from '@/modules/api';
import eventBus from '@/modules/eventBus';
import cartStore, {
    addDishToCart,
    clearCart, clearCartAndAddDish,
    deleteDishFromCart,
    increaseDishInCart,
} from '@/modules/reducers/cartStore';
import {ResponseEvents} from '@/events/Responses';
import {RestaurantEvents} from '@/events/Restaurant';
import {CreateSnack} from '@/components/snackBar/snackBar';

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

  /**
   * Adding dish to cart with it settings
   * @param {object} dishSettings
   */
  addDishToCart(dishSettings: any = {}) {
    cartStore.dispatch(addDishToCart(dishSettings.dish, dishSettings.restaurant));
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
  changeRestaurantAndAddDish(dishSettings: any = {}) {
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
