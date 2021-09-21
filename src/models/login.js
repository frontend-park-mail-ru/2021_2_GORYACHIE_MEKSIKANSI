import { loginPost } from "../modules/api.js";
import eventBus from "../modules/eventBus.js"
import { LoginEvents } from "../events/Login.js"


class LoginModel {
    /**
     * emitting events for login success
     *
     * @param {string} email
     * @param {string} phone
     * @param {string} password
     * @returns {Promise<{status: int, parsedJSON: object}>}
     *
     */
    login(email = '', phone = '', password) {
        loginPost({email, phone, password})
            .then(response => {
                if (response.status === 200) {
                    eventBus.emitEventListener(LoginEvents.loginDone, {});
                } else {
                    eventBus.emitEventListener(LoginEvents.loginFailed, response);
                }
            })
            .catch(response => {
                eventBus.emitEventListener(LoginEvents.loginFailed, response);
            })
    }
}

export default new LoginModel();