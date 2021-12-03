import userStore from '@/modules/reducers/userStore';
import eventBus from '@/modules/eventBus';
import {urls} from '@/modules/urls';
import {Validation} from '@/modules/validation';
import {LoginEvents} from '@/events/Login';
import {AuthStatus} from '@/events/Auth';
import {LoginView} from '@/views/LoginView/loginView';
import LoginModel from '@/models/Login';

/**
 *  Login controller class
 */
export class LoginController {
  private readonly routeTo: Function;
  private readonly loginView: LoginView;
  private parent: HTMLElement;
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
      this.routeTo(urls.home);
    } else {
      eventBus.addEventListener(AuthStatus.userLogin, this.redirect);
      this.loginView.render();
    }
  }

  redirect = () => {
    this.routeTo(urls.home);
  }


  /**
   * Removing view
   */
  remove() {
    eventBus.unsubscribe(AuthStatus.userLogin, this.redirect);
    this.loginView.remove();
  }
}
