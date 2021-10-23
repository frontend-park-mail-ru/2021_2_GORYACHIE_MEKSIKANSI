import {SignUpView} from 'Views/SignUpPage/signUpView.js';
import {Validation} from 'Modules/validation.js';
import SignUpModel from 'Models/SignUp.js';
import eventBus from 'Modules/eventBus.js';
import {SignUpEvents} from 'Events/SignUp.js';
import {userStatus} from "../modules/store";
import store from 'Modules/store.js';
import {AuthStatus} from 'Events/Auth.js';
import {urls} from "../modules/urls";
import {userStore} from "../modules/reducers/userReducer";

/**
 * Signup page controller
 */
export class SignUpController {
  /**
   * Constructor for controller
   * @param {HTMLElement} parent parent html element
   * @param {Function} routeTo router function for routing
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
  }) {
    this.routeTo = routeTo;
    this.parent = parent;
    this.signUpView = new SignUpView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});

    eventBus.addEventListener(SignUpEvents.userSignUpFailed,
        this.signUpView.showErrorFromController.bind(this.signUpView));
  }

  /**
   * Rendering signup page
   */
  render() {
    if (userStore.getState().auth) {
      this.routeTo(urls.home.url);
    } else {
      eventBus.addEventListener(AuthStatus.userLogin, this.redirect);
      this.signUpView.render();
    }
  }

  redirect = () => {
    this.routeTo(urls.home.url);
  }

  /**
   * signup controller func to signup user
   * @param {string} type type of signup user
   * @param {string} name user name
   * @param {string} email user email
   * @param {string} phone user phone
   * @param {string} password user password
   * @param {string} repeatPassword user repeated password
   * @return {Object}
   */
  signUp(type, name, email, phone, password, repeatPassword) {
    const emailValidation = Validation.validateEmail(email);
    const phoneValidation = Validation.validatePhoneNumber(phone);
    const nameValidation = Validation.validateName(name);
    const passwordValidation = Validation.validatePassword(password);
    const passwordRepeatValidation = Validation.validatePasswordRepeat(password,
        repeatPassword);

    if (passwordValidation.validationResult &&
        passwordRepeatValidation.validationResult &&
        emailValidation.validationResult &&
        phoneValidation.validationResult) {
      SignUpModel.signUp({type, name, email, phone, password});
      this.signUpView.hideErrors();
      return {error: false};
    }

    return {
      error: true,
      emailValidation,
      phoneValidation,
      passwordValidation,
      passwordRepeatValidation,
      nameValidation,
    };
  }

  /**
   * Removing listeners from signup page
   */
  remove() {
    eventBus.unsubscribe(AuthStatus.userLogin, this.redirect);
    this.signUpView.remove();
  }
}
