import LoginModel from '../models/Login.js';
import {Validation} from '../modules/validation.js';
import eventBus from '../modules/eventBus.js';
import {LoginEvents} from '../events/Login.js';
import {LoginView} from '../views/LoginView/loginView.js';
import User from '../modules/user.js'
import {ResponseEvents} from '../events/Responses.js';
import {ErrorsText} from '../events/Errors.js';
import {BaseController} from './baseController.js';

/**
 *  Login controller class
 */
export class LoginController extends BaseController {
  /**
   * Constructor for controller
   * @param {HTMLElement} parent parent html element
   * @param {Function} routeTo router function for routing
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo,
  }) {
    super();
    this.routeTo = routeTo;
    this.parent = parent;
    this.loginView = new LoginView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});

    eventBus.addEventListener(LoginEvents.loginFailed,
      this.loginView.showError.bind(this.loginView));
    eventBus.addEventListener(LoginEvents.loginDone,
      this.routeTo);
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
    if (User.Auth) {
      this.routeTo('home');
      return;
    }

    this.loginView.render({});
    this.viewIsActive = true;
  }

  /**
   * Removing view
   */
  remove() {
    this.loginView.remove();
    this.viewIsActive = false;
  }
}
