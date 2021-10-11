import {ResponseEvents} from '../events/Responses.js';
import eventBus from '../modules/eventBus.js';
import {RestaurantEvents} from '../events/Restaurant.js';
import {restaurantGet} from '../modules/api.js';
import {getRestaurantMock} from '../views/mocks.js';

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
}

export default new RestaurantModel();
