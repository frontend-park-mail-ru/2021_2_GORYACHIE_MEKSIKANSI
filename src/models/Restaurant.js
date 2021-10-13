import {ResponseEvents} from '../events/Responses.js';
import eventBus from '../modules/eventBus.js';
import {RestaurantEvents} from '../events/Restaurant.js';
import {restaurantGet, dishGet, addDishPost, clearCartDelete, clearDishFromCartDelete} from '../modules/api.js';
import {getRestaurantMock, getDish, getItemToCart} from '../views/mocks.js';

/**
 * RestaurantModel
 * Model for calling api methods for Restaurant logic
 */
class RestaurantModel {
  /**
   * Check user auth and then get restaurantList,
   * emit HomeEvents.homeGetRestaurantsSuccess
   */
  getRestaurant(id) {
    restaurantGet({url: '/restaurant/' + id})
        .then((response) => {
          eventBus.emitEventListener(RestaurantEvents.restaurantGetSuccess, getRestaurantMock());
          // eventBus.emitEventListener(RestaurantEvents.restaurantGetSuccess, response.parsedJSON);
        })
        .catch(() => { // TODO: добавить взаимодействие с серваком...
          eventBus.emitEventListener(RestaurantEvents.restaurantGetSuccess, getRestaurantMock()); // TODO: toast на падение сервака/отсутствие связи
        });
  }

  getDish(restId, dishId) {
    dishGet({url: '/restaurant/' + restId + '/dish/' + dishId})
        .then((response) => {
          eventBus.emitEventListener(RestaurantEvents.restaurantPopGetSuccess, getDish());
        })
        .catch(() => {
          eventBus.emitEventListener(RestaurantEvents.restaurantPopGetSuccess, getDish());
        });
  }


  addDishToCart(restId, dishId, number) {
    addDishPost({restId, dishId, number})
        .then((response) => {
          eventBus.emitEventListener(RestaurantEvents.restaurantCartAdd, getItemToCart());
        })
        .catch(() => {
          const dish = getItemToCart();
          dish.itemNum = number; // TODO: delete mock
          eventBus.emitEventListener(RestaurantEvents.restaurantCartAdd, dish);
        });
  }

  /**
   * clearCart function
   * call api clearCartDelete for DELETE method req to server
   * with a response result emit clearCartSuccess or clearCartFailed
   */
  clearCart() {
    clearCartDelete()
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(RestaurantEvents.clearCartSuccess, {});
            return;
          }
          eventBus.emitEventListener(RestaurantEvents.clearCartFailed, {});
        })
        .catch(() => { // TODO: server falls to catch
          eventBus.emitEventListener(RestaurantEvents.clearCartSuccess, {});
        });
  }

  clearDishFromCart(dishId) {
    clearDishFromCartDelete(dishId)
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(RestaurantEvents.clearDishSuccess, dishId);
            return;
          }
          eventBus.emitEventListener(RestaurantEvents.clearDishFailed, {});
        })
        .catch(() => { // TODO: server falls to catch
          eventBus.emitEventListener(RestaurantEvents.clearDishSuccess, dishId);
        });
  }
}

export default new RestaurantModel();
