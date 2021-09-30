import eventBus from '../modules/eventBus.js';
import {HomeEvents} from '../events/Home.js';
import {profileGet, restaurantsGet} from '../modules/api.js';
import {checkAuth} from '../modules/api.js';
import {debugFunc} from '../modules/debugMod.js';
import {ResponseEvents} from "../events/Responses.js";

/**
 * Class Home Model
 */
class HomeModel {
  /**
   * Get restaurantList, emit HomeEvents.homeGetRestaurantsSuccess
   */
  getRestaurants() {
    restaurantsGet({url: '/'})
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
              profileGet({url: '/profile'})
                  .then(() => {
                      eventBus.emitEventListener(HomeEvents.homeGetRestaurantsSuccess,
                          response.parsedJSON);
                  })
              debugFunc(response, 'everything is ok');
          } else {
          }
        })
        .catch(() => {
          eventBus.emitEventListener(HomeEvents.homeGetRestaurantsSuccess, {});
        });
  }

  /**
   * Check user auth and then get restaurantList,
   * emit HomeEvents.homeGetRestaurantsSuccess
   */
  checkAuthAndGetRestaurants() {
    checkAuth({url: '/check'})
      .then(() => {
            this.getRestaurants();
      })
      .catch();
  }
}

export default new HomeModel();
