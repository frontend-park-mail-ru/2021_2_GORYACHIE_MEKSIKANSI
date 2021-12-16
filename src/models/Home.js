import eventBus from 'Modules/eventBus.js';
import {HomeEvents} from 'Events/Home.js';
import {profileGet, restaurantsGet} from 'Modules/api.js';
import userStore from "../modules/reducers/userStore";
import {getRecommends} from "../modules/api";
import {ResponseEvents} from "../events/Responses";

/**
 * Class Home Model
 */
class HomeModel {
  /**
   * Get restaurantList, emit HomeEvents.homeGetRestaurantsSuccess
   */
  getRestaurants() {
    restaurantsGet({url: '/restaurant/'})
        .then(async (response) => {
          if (userStore.getState().auth) {
            const recommends = await getRecommends();
            if (recommends.status === ResponseEvents.OK) {
              response.body.recommends = {
                restaurants: recommends.body.restaurants.restaurants_info,
                tags: recommends.body.restaurants.tags,
              }
            }
          }
          eventBus.emitEventListener(HomeEvents.homeGetRestaurantsSuccess,
            response.body);
        })
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
