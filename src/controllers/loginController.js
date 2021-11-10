import LoginModel from 'Models/Login.js';
import {Validation} from 'Modules/validation.js';
import eventBus from 'Modules/eventBus.js';
import {LoginEvents} from 'Events/Login.js';
import {LoginView} from 'Views/LoginView/loginView.js';
import {ResponseEvents} from 'Events/Responses.js';
import {ErrorsText} from 'Events/Errors.js';
import {urls} from 'Modules/urls.js';
import {userStatus} from "Modules/store";
import {AuthStatus} from 'Events/Auth.js';
import userStore from "Modules/reducers/userStore";

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
    this.loginView = new LoginView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});

    eventBus.addEventListener(LoginEvents.loginFailed,
        this.loginView.showError.bind(this.loginView));
  }

  /**
   *  Validating the input and put it in model or return
   * @param {string} login user login value from input
   * @param {string} password user password value from input
   * @return {Object} with error status and validation objects
   */
  login(login, password) {
    const passwordValidation = Validation.validatePassword(password);
    const emailValidation = Validation.validateEmail(login);
    const phoneValidation = Validation.validatePhoneNumber(login);

    if (passwordValidation.validationResult) {
      if (emailValidation.validationResult) {
        LoginModel.login('client', login, '', password);
        this.loginView.hideError();
        return {error: false};
      }

      if (phoneValidation.validationResult) {
        LoginModel.login('client', '', login, password);
        this.loginView.hideError();
        return {error: false};
      }
    }

    return {
      error: true,
    };
  }

  /**
   * Rendering view
   */
  render() {
    if (userStore.getState().auth) {
      this.routeTo(urls.home.url);
    } else {
      eventBus.addEventListener(AuthStatus.userLogin, this.redirect);
      this.loginView.render();
    }
  }

  redirect = () => {
    this.routeTo(urls.home.url);
  }


  /**
   * Removing view
   */
  remove() {
    eventBus.unsubscribe(AuthStatus.userLogin, this.redirect);
    this.loginView.remove();
  }
}
