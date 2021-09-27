import eventBus from '../modules/eventBus.js';
import {HomeEvents} from '../events/Home.js';
import {profileGet, restaurantsGet} from '../modules/api.js';
import {checkAuth} from '../modules/api.js';
import {debugFunc} from '../modules/debugMod.js';

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
          if (response.status === 200) {
            eventBus.emitEventListener(HomeEvents.homeGetRestaurantsSuccess,
                response.parsedJSON);
            debugFunc(response.status, 'everything is ok, but fetch failed');
          } else {
            debugFunc(response, 'everything is ok');
          }
        })
        .catch((response) => {
          eventBus.emitEventListener(HomeEvents.homeGetRestaurantsSuccess, {});
        });
  }

  /**
   * Check user auth and then get restaurantList,
   * emit HomeEvents.homeGetRestaurantsSuccess
   */
  checkAuthAndGetRestaurants() {
    checkAuth({url: '/check'})
<<<<<<< HEAD
      .then((response) => {
        if (!User.Auth && response.status === 200) {
          profileGet({url: '/profile'});
        }
        this.getRestaurants();
      })
      .catch();
=======
        .then((response) => {
          if (response.status === 200) {
            profileGet({url: '/profile'});
          }
          this.getRestaurants();
        })
        .catch();
>>>>>>> 398f72b9fc330468c936bc476da1763e4653f498
  }
}

export default new HomeModel();
