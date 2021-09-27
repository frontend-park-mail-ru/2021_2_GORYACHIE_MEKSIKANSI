import {SignUpView} from '../views/SignUpPage/signUpView.js';
import {Validation} from '../modules/validation.js';
import SignUpModel from '../models/SignUp.js';
import eventBus from '../modules/eventBus.js';
import {SignUpEvents} from '../events/SignUp.js';
import historyRedirection from '../modules/historyRedirection.js';
import {debugFunc} from '../modules/debugMod.js';
import user from '../modules/user.js';

export class SignUpController {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
  }) {
    this.routeTo = routeTo;
    this.parent = parent;
    this.signUpView = new SignUpView({parent: parent, routeTo: this.routeTo, controller: this});
    eventBus.addEventListener(SignUpEvents.userSignUpSuccess, this.signupSuccess.bind(this));
    eventBus.addEventListener(SignUpEvents.userSignUpFailed, this.signupFailed.bind(this));
  }

  render() {
    if (user.Auth) {
      return;
    }

    this.signUpView.render({});
  }

  signUp(type, name, email, phone, password, repeatPassword) {
    const emailValidation = Validation.validateEmail(email);
    const phoneValidation = Validation.validatePhoneNumber(phone);
    const nameValidation = Validation.validateName(name);
    let passwordRepeatValidation = {};
    const passwordValidation = Validation.validatePassword(password);
    if (passwordValidation.validationResult) {
      passwordRepeatValidation = Validation.validatePasswordRepeat(password, repeatPassword);
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

    if (passwordValidation.validationResult && passwordRepeatValidation.validationResult && emailValidation.validationResult && phoneValidation.validationResult) {
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

  remove() {
    this.signUpView.remove();
  }

  signupFailed() {
    this.signUpView.showErrorFromController('Не удалось установить соединение');
    debugFunc({error}, 'login failed');
  }

  signupSuccess() {
    this.routeTo('/');
  }
}
