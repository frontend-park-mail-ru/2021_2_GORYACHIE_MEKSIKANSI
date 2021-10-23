import eventBus from 'Modules/eventBus.js';
import {HomeEvents} from 'Events/Home.js';
import {profileGet, restaurantsGet} from 'Modules/api.js';

/**
 * Class Home Model
 */
class HomeModel {
  /**
   * Get restaurantList, emit HomeEvents.homeGetRestaurantsSuccess
   */
  getRestaurants() {
    restaurantsGet({url: '/restaurant/'})
        .then((response) => {
          eventBus.emitEventListener(HomeEvents.homeGetRestaurantsSuccess,
              response.body);
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
    await profileGet({})
        .catch(() => {}); // TODO: Выводить, тоаст или ошибочную страницу по поводу коннекта с сервером
    this.getRestaurants();
  }
}

export default new HomeModel();
