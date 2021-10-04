import eventBus from '../modules/eventBus.js';
import {HomeEvents} from '../events/Home.js';
import {profileGet, restaurantsGet} from '../modules/api.js';

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
          eventBus.emitEventListener(HomeEvents.homeGetRestaurantsSuccess,
              response.parsedJSON);
        })
        .catch(() => {
          eventBus.emitEventListener(HomeEvents.homeGetRestaurantsSuccess, {});
        });
  }

  /**
   * Check user auth and then get restaurantList,
   * emit HomeEvents.homeGetRestaurantsSuccess
   */
  async checkAuthAndGetRestaurants() {
    await profileGet({url: '/profile'});
    this.getRestaurants();
  }
}

export default new HomeModel();
