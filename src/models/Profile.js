import eventBus from '../modules/eventBus.js';
import {ProfileEvents} from '../events/Profile.js';
import {profileGet} from '../modules/api.js';
import {ResponseEvents} from '../events/Responses.js';
import {urls} from '../modules/urls.js';

/**
 * Class Profile Model
 */
class ProfileModel {
  /**
   * Check user auth and then get restaurantList,
   * emit HomeEvents.homeGetRestaurantsSuccess
   */
  checkAuth() {
    profileGet({url: '/profile'})
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(ProfileEvents.userLoggedIn, {});
            return;
          }
          eventBus.emitEventListener(ProfileEvents.userNotAuth, urls.login.url);
        });
  }
}

export default new ProfileModel();
