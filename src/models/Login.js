import {loginPost, profileGet} from '../modules/api.js';
import eventBus from '../modules/eventBus.js';
import {LoginEvents} from '../events/Login.js';
import {debugFunc} from '../modules/debugMod.js';


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
          if (response.status === 200) {
            eventBus.emitEventListener(LoginEvents.loginDone, {});
            profileGet({url: '/profile'});
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
