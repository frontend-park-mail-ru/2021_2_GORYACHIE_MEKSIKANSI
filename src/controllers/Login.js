import LoginModel from '../models/Login.js';
import {Validation} from '../modules/validation.js';
import user from '../modules/user.js';
import eventBus from '../modules/eventBus.js';
import {LoginEvents} from '../events/Login.js';
import {debugFunc} from '../modules/debugMod.js';
import historyRedirection from '../modules/historyRedirection.js';
import {LoginView} from '../views/LoginView/loginView.js';

export class LoginController {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
  }) {
    this.routeTo = routeTo;
    this.parent = parent;
    eventBus.addEventListener(LoginEvents.loginDone, this.correctLogin.bind(this));
    this.loginView = new LoginView({parent: parent, routeTo: this.routeTo, controller: this});
    eventBus.addEventListener(LoginEvents.loginFailed, this.loginFailed.bind(this));
  }

  login(login, password) {
    const passwordValidation = Validation.validatePassword(password);
    let loginValidation = Validation.validateEmail(login);

    if (loginValidation.validationResult && passwordValidation.validationResult) {
      LoginModel.login(login, '', password);
      return {
        error: false,
      };
    } else {
      loginValidation = Validation.validatePhoneNumber(login);
      if (loginValidation.validationResult && passwordValidation.validationResult) {
        LoginModel.login('', login, password);
        return {
          error: false,
        };
      }
    }

    return {
      error: true,
      loginValidation,
      passwordValidation,
    };
  }

  render() {
    if (user.Auth) {
      return;
    }

    this.loginView.render({});
  }

  correctLogin() {
    const routeTo = historyRedirection.pop();
    if (routeTo !== '') {
      this.routeTo(routeTo);
      return;
    }

    this.routeTo('/');
  }

  loginFailed(error) {
    debugFunc({error}, 'login failed');
  }

  remove() {
    this.loginView.remove();
  }
}
