import {ResponseEvents} from '../events/Responses.js';
import eventBus from '../modules/eventBus.js';
import {RestaurantEvents} from '../events/Restaurant.js';
import {restaurantGet, dishGet} from '../modules/api.js';
import {getRestaurantMock, getDish} from '../views/mocks.js';

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
        .catch(() => {  // TODO: добавить взаимодействие с серваком...
          eventBus.emitEventListener(RestaurantEvents.restaurantGetSuccess, getRestaurantMock());  // TODO: toast на падение сервака/отсутствие связи
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
}

export default new RestaurantModel();
