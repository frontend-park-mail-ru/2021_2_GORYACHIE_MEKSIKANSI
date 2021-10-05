import {loginPost} from '../modules/api.js';
import eventBus from '../modules/eventBus.js';
import {LoginEvents} from '../events/Login.js';
import {ResponseEvents} from '../events/Responses.js';
import {urls} from '../modules/urls.js';
import {ErrorsText} from '../events/Errors.js';

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
            eventBus.emitEventListener(LoginEvents.loginDone, urls.home.url);
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
}

export default new LoginModel();
