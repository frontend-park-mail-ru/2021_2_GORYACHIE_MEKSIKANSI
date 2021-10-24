import {loginPost, profileGet} from 'Modules/api.js';
import eventBus from 'Modules/eventBus.js';
import {LoginEvents} from 'Events/Login.js';
import {ResponseEvents} from 'Events/Responses.js';
import {urls} from 'Modules/urls.js';
import {ErrorsText} from 'Events/Errors.js';

/**
 * class login model
 *
 */
class LoginModel {
  /**
     * emitting events for login success
     *
     * @param {string} type user type
     * @param {string} email user email
     * @param {string} phone user phone
     * @param {string} password user password
     *
     */
  login(type, email = '', phone = '', password) {
    loginPost({type, email, phone, password})
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            this.getProfile();
            return;
          }
          eventBus.emitEventListener(LoginEvents.loginFailed,
              response.explain);
        })
        .catch(() => {
          eventBus.emitEventListener(LoginEvents.loginFailed,
              ErrorsText.FailedToFetch);
        });
  }

  getProfile() {
    profileGet({})
        .then((response) => {
          if (response.status !== ResponseEvents.OK) {
            eventBus.emitEventListener(LoginEvents.loginGetProfileFailed, {});
          }
        });
  }
}

export default new LoginModel();
