import {ResponseEvents} from '../events/Responses.js';
import eventBus from '../modules/eventBus.js';
import {RestaurantEvents} from '../events/Restaurant.js';
import {restaurantGet, dishGet, addDishPost, clearCartDelete, clearDishFromCartDelete} from '../modules/api.js';
import {getRestaurantMock, getDish, getItemToCart} from '../views/mocks.js';
import store, {actions} from '../modules/store.js';

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


  addDishToCart(dishSettings = {}) {
    addDishPost(dishSettings)
        .then((response) => {
          store.dispatch({
            actionType: actions.storeCartAddDish,
            dish: getItemToCart(dishSettings.id),
          });
          eventBus.emitEventListener(RestaurantEvents.restaurantCartAdd, {});
        })
        .catch(() => {
          if ('cartId' in dishSettings) {
            store.dispatch({
              actionType: actions.storeCartAddDish,
              dish: dishSettings,
            });
          } else {
            // get dish mock
            const dishMock = getItemToCart(dishSettings.id);
            // select needed checkboxes
            const dishCheckboxes = dishMock.dishCheckboxes.filter((item) => {
              return dishSettings.dishCheckboxes.find((checkbox) => {
                return Number(checkbox.dishCheckboxId) === Number(item.dishCheckBoxId);
              });
            });
            // create dish obj and calc summary cost
            const dish = {
              ...getItemToCart(dishSettings.id),
              dishCheckboxes: dishCheckboxes,
              dishCost: dishCheckboxes.reduce((prev, item) => {
                prev += item.dishCheckboxRowCost;
                return prev;
              }, dishMock.dishCost),
              dishRadios: dishSettings.dishRadios,
            };
            console.log(dish);
            store.dispatch({
              actionType: actions.storeCartAddDish,
              dish: dish,
            });
          }
          eventBus.emitEventListener(RestaurantEvents.restaurantCartAdd, {});
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
            store.dispatch({
              actionType: actions.storeCartDeleteAll,
            });
            eventBus.emitEventListener(RestaurantEvents.clearCartSuccess, {});
            return;
          }
          eventBus.emitEventListener(RestaurantEvents.clearCartFailed, {});
        })
        .catch(() => { // TODO: server falls to catch
          store.dispatch({
            actionType: actions.storeCartDeleteAll,
          });
          eventBus.emitEventListener(RestaurantEvents.clearCartSuccess, {});
        });
  }

  clearDishFromCart(dishId) {
    clearDishFromCartDelete(dishId)
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            store.dispatch({
              actionType: actions.storeCartDeleteDish,
              cartId: dishId,
            });
            eventBus.emitEventListener(RestaurantEvents.clearDishSuccess, {});
            return;
          }
          eventBus.emitEventListener(RestaurantEvents.clearDishFailed, {});
        })
        .catch(() => { // TODO: server falls to catch
          store.dispatch({
            actionType: actions.storeCartDeleteDish,
            cartId: dishId,
          });
          eventBus.emitEventListener(RestaurantEvents.clearDishSuccess, {});
        });
  }
}

export default new RestaurantModel();
