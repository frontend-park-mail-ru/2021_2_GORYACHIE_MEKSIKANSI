import LoginModel from "../models/Login.js"
import { Validation } from "../modules/validation.js"
import users from "../modules/user.js"
import eventBus from "../modules/eventBus.js";
import {LoginEvents} from "../events/Login.js";
import {debugFunc} from "../debugMod.js";
import historyRedirection from "../modules/historyRedirection.js";

export class LoginController {
    constructor({
        location = document.body,
        routeTo = () => {

        }
                }) {
        this.routeTo = routeTo;
        this.location = location;
        eventBus.addEventListener(LoginEvents.loginDone, this.correctLogin.bind(this));
        eventBus.addEventListener(LoginEvents.loginFailed, this.loginFailed.bind(this));
    }

    login(email, phone, password) {
        if (email !== '') {
            const loginStatus = Validation.validateEmail(email)
        }
        if (phone !== '') {
            const loginStatus = Validation.validatePhoneNumber(phone)
        }
    }

    correctLogin() {
        const routeTo = historyRedirection.pop();
        if (routeTo !== '') {
            this.routeTo(routeTo)
            return;
        }

        this.routeTo('')
    }

    loginFailed (error) {
        debugFunc({}, 'login failed')
    }
}