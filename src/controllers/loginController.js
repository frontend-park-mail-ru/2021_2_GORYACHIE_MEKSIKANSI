import LoginModel from '../models/Login.js';
import {Validation} from '../modules/validation.js';
import eventBus from '../modules/eventBus.js';
import {LoginEvents} from '../events/Login.js';
import {LoginView} from '../views/LoginView/loginView.js';
import User from '../modules/user.js'

/**
 *  Login controller class
 */
export class LoginController {
  /**
   * Constructor for controller
   * @param {HTMLElement} parent parent html element
   * @param {Function} routeTo router function for routing
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo,
  }) {
    this.routeTo = routeTo;
    this.parent = parent;
    eventBus.addEventListener(LoginEvents.loginDone,
        this.correctLogin.bind(this));
    this.loginView = new LoginView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});
    eventBus.addEventListener(LoginEvents.loginFailed,
        this.loginFailed.bind(this));
  }

  /**
   *  Validating the input and put it in model or return
   * @param {string} login user login value from input
   * @param {string} password user password value from input
   * @return {Object} with error status and validation objects
   */
  login(login, password) {
    const passwordValidation = Validation.validatePassword(password);
    let loginValidation = Validation.validateEmail(login);

    if (loginValidation.validationResult &&
        passwordValidation.validationResult) {
      LoginModel.login('client', login, '', password);
      this.loginView.hideError();
      return {
        error: false,
      };
    } else {
      loginValidation = Validation.validatePhoneNumber(login);
      if (loginValidation.validationResult &&
          passwordValidation.validationResult) {
        LoginModel.login('client', '', login, password);
        this.loginView.hideError();
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

  /**
   * Rendering view
   */
  render() {
    if (User.Auth) {
      this.routeTo('home');
    }

    this.loginView.render({});
  }

  /**
   * Action that emits when emits correct login event
   */
  correctLogin() {
    this.routeTo('home');
  }

  /**
   * Action that emits when emits incorrect login event
   */
  loginFailed(response) {
    if (response !== 500) {
      this.loginView.showError(response.parsedJSON);
    } else {
      this.loginView.showError('Неизвестная ошибка');
    }
  }

  /**
   * Removing view
   */
  remove() {
    this.loginView.remove();
  }
}
