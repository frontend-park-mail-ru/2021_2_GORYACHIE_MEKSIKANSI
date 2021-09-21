import { AuthStatus } from "../events/Auth.js";
import eventBus from "./eventBus.js";

class User {
    constructor() {
        eventBus.addEventListener(AuthStatus.userLogin, this.login.bind(this))
        eventBus.addEventListener(AuthStatus.userLogout, this.logout.bind(this))
    }

    /**
     * setting all user fields to empty string
     *
     */
    logout() {
        this.type = '';
        this.name = '';
        this.email = '';
        this.phone = '';
        this.Auth = false;
    }

    /**
     * setting all user fields to passed fields
     *
     * @param {{type: string, name: string, email: string, phone: string}} params
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
    }
}

export default new User()
