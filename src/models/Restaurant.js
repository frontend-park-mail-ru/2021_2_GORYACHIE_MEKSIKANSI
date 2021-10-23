import {ResponseEvents} from 'Events/Responses.js';
import eventBus from '../modules/eventBus.js';
import {RestaurantEvents} from 'Events/Restaurant.js';
import {restaurantGet, dishGet, addDishPost, clearCartDelete, clearDishFromCartDelete} from '../modules/api.js';
import {getRestaurantMock, getDish, getItemToCart} from 'Views/mocks.js';
import store, {actions} from '../modules/store.js';

/**
 * RestaurantModel
 * Model for calling api methods for Restaurant logic
 */
const updateStorage = () => {
  localStorage.removeItem('cart');
  localStorage.setItem('cart', JSON.stringify(store.getState().cartState));
  localStorage.removeItem('cartRestaurant');
  localStorage.setItem('cartRestaurant', JSON.stringify(store.getState().cartRestaurantState));
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
    addDishPost(dishSettings)
        .then((response) => {
          store.dispatch({
            actionType: actions.storeCartAddDish,
            dish: getItemToCart(dishSettings.dish.id),
          });
          eventBus.emitEventListener(RestaurantEvents.restaurantCartAdd, {});
        })
        .catch(() => {
          if ('cartId' in dishSettings.dish) {
            store.dispatch({
              actionType: actions.storeCartAddDish,
              dish: dishSettings.dish,
            });
          } else {
            if (store.getState().cartRestaurantState === null) {
              store.dispatch({
                actionType: actions.storeCartRestaurantSet,
                restaurant: dishSettings.restaurant,
              });
            }
            // get dish mock
            const dishMock = getItemToCart(dishSettings.dish.id);
            // select needed checkboxes
            const dishCheckboxes = dishMock.ingredients.filter((item) => {
              return dishSettings.dish.ingredients.find((checkbox) => {
                return Number(checkbox.id) === Number(item.id);
              });
            });
            // calc cost of dish with options
            const cost = dishCheckboxes.reduce((prev, item) => {
              prev += item.cost;
              return prev;
            }, dishMock.cost);
            // create dish obj and calc summary cost
            const dish = {
              ...dishMock,
              ingredients: dishCheckboxes,
              cost: cost,
              radios: dishSettings.dish.radios,
              num: dishSettings.dish.num,
            };
            store.dispatch({
              actionType: actions.storeCartAddDish,
              dish: dish,
            });
          }
          eventBus.emitEventListener(RestaurantEvents.restaurantCartAdd, {});
          updateStorage();
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
            store.dispatch({
              actionType: actions.storeCartRestaurantSet,
              restaurant: null,
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
          store.dispatch({
            actionType: actions.storeCartRestaurantSet,
            restaurant: null,
          });
          eventBus.emitEventListener(RestaurantEvents.clearCartSuccess, {});
          updateStorage();
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
            if (store.getState().cartState.cart.length === 0) {
              store.dispatch({
                actionType: actions.storeCartRestaurantSet,
                restaurant: null,
              });
            }
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
          if (store.getState().cartState.length === 0) {
            store.dispatch({
              actionType: actions.storeCartRestaurantSet,
              restaurant: null,
            });
          }
          eventBus.emitEventListener(RestaurantEvents.clearDishSuccess, {});
          updateStorage();
        });
  }

  changeRestaurantAndAddDish(dishSettings = {}) {
    clearCartDelete()
        .then(() => {
          // change restaurant
          store.dispatch({
            actionType: actions.storeCartRestaurantSet,
            restaurant: dishSettings.restaurant,
          });
          store.dispatch({
            actionType: actions.storeCartDeleteAll,
          });
          this.addDishToCart(dishSettings);
        })
        .catch(() => {
          // change restaurant
          store.dispatch({
            actionType: actions.storeCartRestaurantSet,
            restaurant: dishSettings.restaurant,
          });
          store.dispatch({
            actionType: actions.storeCartDeleteAll,
          });
          this.addDishToCart(dishSettings);
          updateStorage();
        });
  }
}

export default new RestaurantModel();
