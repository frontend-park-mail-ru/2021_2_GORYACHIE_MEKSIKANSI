import LoginModel from "../models/Login.js"
import { Validation } from "../modules/validation.js"
import user from "../modules/user.js"
import eventBus from "../modules/eventBus.js";
import {LoginEvents} from "../events/Login.js";
import {debugFunc} from "../modules/debugMod.js";
import historyRedirection from "../modules/historyRedirection.js";
import {LoginView} from "../views/Login.js";

export class LoginController {
    constructor({
        root = document.body,
        routeTo = () => {

        }
                }) {
        this.routeTo = routeTo;
        this.root = root;
        eventBus.addEventListener(LoginEvents.loginDone, this.correctLogin.bind(this));
        this.loginView = new LoginView({root, controller: this});
        eventBus.addEventListener(LoginEvents.loginFailed, this.loginFailed.bind(this));
    }

    login(email, phone, password) {
        const passwordValidation = Validation.validatePassword(password);
        let loginValidation = {}
        if (email !== '') {
            loginValidation = Validation.validateEmail(email);
        } else {
            loginValidation = Validation.validatePhoneNumber(phone);
        }

        if (!loginValidation.validationResult && !passwordValidation.validationResult) {
            return {
                error: true,
                loginValidation,
                passwordValidation
            }
        }

        LoginModel.login(email, phone, password);
        return {
            error: false,
        }
    }

    render() {
        if (user.Auth) {
            return;
        }

        this.loginView.render()
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