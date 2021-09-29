import {SignUpView} from '../views/SignUpPage/signUpView.js';
import {Validation} from '../modules/validation.js';
import SignUpModel from '../models/SignUp.js';
import eventBus from '../modules/eventBus.js';
import {SignUpEvents} from '../events/SignUp.js';
import {debugFunc} from '../modules/debugMod.js';
import user from '../modules/user.js';

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
        this.signupSuccess.bind(this));
    eventBus.addEventListener(SignUpEvents.userSignUpFailed,
        this.signupFailed.bind(this));
  }

  /**
   * Rendering signup page
   */
  render() {
    if (user.Auth) {
      this.routeTo('/');
    }

    this.signUpView.render({});
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
    let passwordRepeatValidation = {};
    const passwordValidation = Validation.validatePassword(password);
    if (passwordValidation.validationResult) {
      passwordRepeatValidation = Validation.validatePasswordRepeat(password,
          repeatPassword);
    } else {
      return {
        error: true,
        emailValidation,
        phoneValidation,
        passwordValidation,
        passwordRepeatValidation,
        nameValidation,
      };
    }

    if (passwordValidation.validationResult &&
        passwordRepeatValidation.validationResult &&
        emailValidation.validationResult && phoneValidation.validationResult) {
      SignUpModel.signUp({type, name, email, phone, password});
      this.signUpView.hideErrors();
      return {
        error: false,
      };
    } else {
      return {
        error: true,
        emailValidation,
        phoneValidation,
        passwordValidation,
        passwordRepeatValidation,
        nameValidation,
      };
    }
  }

  /**
   * Removing listeners from signup page
   */
  remove() {
    this.signUpView.remove();
  }

  /**
   * Show errors if signup failed
   */
  signupFailed(response) {
    if (response === 200) {
      this.signUpView.showErrorFromController(response.parsedJSON);
    } else {
      this.signUpView.showErrorFromController('Неизветсная ошибка');
    }
  }

  /**
   * Render home page if signup success
   */
  signupSuccess() {
    this.routeTo('/');
  }
}
