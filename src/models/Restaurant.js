import {ResponseEvents} from 'Events/Responses.js';
import eventBus from 'Modules/eventBus.js';
import {RestaurantEvents} from 'Events/Restaurant.js';
import {getRestaurantMock, getDish, getItemToCart} from 'Views/mocks.js';
import store, {actions} from 'Modules/store.js';
import cartStore, {addDishToCart, clearCart, deleteDishFromCart} from "../modules/reducers/cartStore";
import {dishGet, restaurantGet} from "../modules/api";

class RestaurantModel {
  /**
   * Check user auth and then get restaurantList,
   * emit HomeEvents.homeGetRestaurantsSuccess
   */
  getRestaurant(id) {
    restaurantGet({url: '/restaurant/' + id})
        .then((response) => {
          // eventBus.emitEventListener(RestaurantEvents.restaurantGetSuccess, getRestaurantMock()); // mock from mocks
          eventBus.emitEventListener(RestaurantEvents.restaurantGetSuccess, response.body);
        })
        .catch(() => { // TODO: добавить взаимодействие с серваком...
          eventBus.emitEventListener(RestaurantEvents.restaurantGetSuccess, getRestaurantMock()); // TODO: toast на падение сервака/отсутствие связи
        });
  }

  getDish(restId, dishId) {
    dishGet({url: '/restaurant/' + restId + '/dish/' + dishId})
        .then((response) => {
          // eventBus.emitEventListener(RestaurantEvents.restaurantPopGetSuccess, getDish()); // mock from mocks
          eventBus.emitEventListener(RestaurantEvents.restaurantPopGetSuccess, response.body);
        })
        .catch(() => {
          eventBus.emitEventListener(RestaurantEvents.restaurantPopGetSuccess, getDish());
        });
  }

//////////////////////////////////////Cart Model////////////////////////////////////////////////////////////////////////

  addDishToCart(dishSettings = {}) {
    cartStore.dispatch(addDishToCart(dishSettings.dish, dishSettings.restaurant));
  }

  /**
   * clearCart function
   * call api clearCartDelete for DELETE method req to server
   * with a response result emit clearCartSuccess or clearCartFailed
   */
  clearCart() {
    cartStore.dispatch(clearCart());
  }

  deleteDishFromCart(itNum) {
    cartStore.dispatch(deleteDishFromCart(itNum));
  }
}

export default new RestaurantModel();
