import {SignUpView} from '../views/SignUpPage/signUpView.js';
import {Validation} from '../modules/validation.js';
import SignUpModel from '../models/SignUp.js';
import eventBus from '../modules/eventBus.js';
import {SignUpEvents} from '../events/SignUp.js';
import user from '../modules/user.js';
import {urls} from '../modules/urls.js';

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

    eventBus.addEventListener(SignUpEvents.userSignUpSuccess,
        this.routeTo);
    eventBus.addEventListener(SignUpEvents.userSignUpFailed,
        this.signUpView.showErrorFromController.bind(this.signUpView));
    eventBus.addEventListener(SignUpEvents.userCheckFailed,
        this.signUpView.render.bind(this.signUpView));
    eventBus.addEventListener(SignUpEvents.userCheckDone,
        this.routeTo);
  }

  /**
   * Rendering signup page
   */
  render() {
    SignUpModel.checkAuth();
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
    this.signUpView.remove();
  }
}
