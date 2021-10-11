import {AuthStatus} from '../events/Auth.js';
import eventBus from './eventBus.js';
import {logoutPost} from './api.js';
import {urls} from './urls.js';

/**
 * User class
 */
class User {
  /**
   * User constructor
   */
  constructor() {
    eventBus.addEventListener(AuthStatus.userLogin, this.login.bind(this));
    eventBus.addEventListener(AuthStatus.userLogout, this.logout.bind(this));
  }

  /**
     * setting all user fields to empty string
     *
     */
  async logout() {
    await logoutPost()
        .then((response) => {
          this.type = '';
          this.name = '';
          this.email = '';
          this.phone = '';
          this.Auth = false;
          eventBus.emitEventListener(AuthStatus.userLoggedOutHomeRerender,
              urls.home.url);
        });
  }

  /**
     * setting all user fields to passed fields
     *
     * @param {{type: string, name: string, email: string, phone: string}}params
     *
     */
  login({
    type = '',
    name = '',
    email = '',
    phone = '',
  } = {}) {
    this.type = type;

    if (name) {
      this.name = name;
    }

    if (email) {
      this.email = email;
    }

    if (phone) {
      this.phone = phone;
    }

    this.Auth = true;
  }
}

export default new User();
