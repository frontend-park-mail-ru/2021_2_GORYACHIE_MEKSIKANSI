import {loginPost, profileGet} from '../modules/api.js';
import eventBus from '../modules/eventBus.js';
import {LoginEvents} from '../events/Login.js';
import {debugFunc} from '../modules/debugMod.js';
import User from '../modules/user.js';


class LoginModel {
  /**
     * emitting events for login success
     *
     * @param {string} email
     * @param {string} phone
     * @param {string} password
     * @return {Promise<{status: int, parsedJSON: object}>}
     *
     */
  login(type, email = '', phone = '', password) {
    loginPost({type, email, phone, password})
        .then((response) => {
          if (response.status === 200) {
            eventBus.emitEventListener(LoginEvents.loginDone, {});
            debugFunc(response, 'login result');

          } else {
            eventBus.emitEventListener(LoginEvents.loginFailed, response);
            debugFunc(response, 'login result');
          }
        })
        .catch((response) => {
          eventBus.emitEventListener(LoginEvents.loginFailed, response);
          debugFunc(response, 'login result');
        });
  }
}

export default new LoginModel();
