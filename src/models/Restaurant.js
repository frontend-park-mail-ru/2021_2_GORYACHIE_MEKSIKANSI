import {ResponseEvents} from 'Events/Responses.js';
import eventBus from 'Modules/eventBus.js';
import {RestaurantEvents} from 'Events/Restaurant.js';
import {getRestaurantMock, getDish, getItemToCart} from 'Views/mocks.js';
import store, {actions} from 'Modules/store.js';
import cartStore, {addDishToCart, clearCart, deleteDishFromCart} from "../modules/reducers/cartStore";
import {dishGet, restaurantGet} from "../modules/api";

/**
 * RestaurantModel
 * Model for calling api methods for Restaurant logic
 */
const updateStorage = () => {
  localStorage.removeItem('cart');
  localStorage.setItem('cart', JSON.stringify(cartStore.getState()));
};

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
    console.log(dishSettings);
    cartStore.dispatch(addDishToCart(dishSettings, {}));
  }

  /**
   * clearCart function
   * call api clearCartDelete for DELETE method req to server
   * with a response result emit clearCartSuccess or clearCartFailed
   */
  clearCart() {
    cartStore.dispatch(clearCart());
  }

  deleteDishFromCart(cId) {
    cartStore.dispatch(deleteDishFromCart(cId));
  }
}

export default new RestaurantModel();
