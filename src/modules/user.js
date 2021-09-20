import { AuthStatus } from "../events/Auth.js";
import eventBus from "../eventBus.js";

class User {
    constructor() {
        eventBus.subscribe(AuthStatus.userLogin, this.login.bind(this))
        eventBus.subscribe(AuthStatus.userLogout, this.logout.bind(this))
    }

    logout() {
        this.type = '';
        this.name = '';
        this.email = '';
        this.phone = '';
        this.Auth = false;
    }

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
    }
}

export default new User()
