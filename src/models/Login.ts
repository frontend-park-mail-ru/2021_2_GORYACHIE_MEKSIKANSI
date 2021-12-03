import {loginPost, profileGet} from '@/modules/api';
import eventBus from '@/modules/eventBus';
import {LoginEvents} from '@/events/Login';
import {ResponseEvents} from '@/events/Responses';
import {ErrorsText} from '@/events/Errors';

/**
 * class login model
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

  /**
   * getting profile method
   */
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
