import {loginPost} from '../modules/api.js';
import eventBus from '../modules/eventBus.js';
import {LoginEvents} from '../events/Login.js';
import {ResponseEvents} from '../events/Responses.js';


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
            eventBus.emitEventListener(LoginEvents.loginDone, {});
          } else {
            eventBus.emitEventListener(LoginEvents.loginFailed, response);
          }
        })
        .catch(() => {
          eventBus.emitEventListener(LoginEvents.loginFailed,
              {status: ResponseEvents.InternalError});
        });
  }
}

export default new LoginModel();
