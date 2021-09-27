import {View} from '../View.js';
import {SignUpController} from '../../controllers/signUpController.js';
import {debugFunc} from '../../modules/debugMod.js';

export class SignUpView extends View {
  /**
   *
   * @param parent
   * @param routeTo
   * @param controller
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller = new SignUpController({parent: parent, routeTo: routeTo()}),
  }) {
    super({
      parent: parent,
      routeTo: routeTo,
      controller: controller,
    });
  }
  /**
   * Method that render login page in inner HTML of element
   */
  render(props = {}) {
    const template = Handlebars.templates['signUpPage.hbs'];
    this.parent.innerHTML = template({});

    this.settingUp();
  }

  /**
   * Method calling by
   * @param event
   * @private
   */
  _submitListener(event) {
    const email = document.getElementById('email');
    const name = document.getElementById('name');
    const phone = document.getElementById('phone_number');
    const password = document.getElementById('password');
    const passwordRepeat = document.getElementById('password_repeat');
    event.preventDefault();

    const type = 'client';
    const signUpResult = this.controller.signUp(type, name.value, email.value, phone.value, password.value, passwordRepeat.value);

    if (signUpResult.error) {
      if (!signUpResult.passwordValidation.validationResult) {
        this.showError('password_error', signUpResult.passwordValidation.validationText, password, passwordRepeat);
      } else if (!signUpResult.passwordRepeatValidation.validationResult) {
        this.showError('password_error', signUpResult.passwordRepeatValidation.validationText, password, passwordRepeat);
      } else {
        this.hideError('password_error', password, passwordRepeat);
      }
      if (!signUpResult.emailValidation.validationResult) {
        this.showError('email_error', signUpResult.emailValidation.validationText, email);
      } else {
        this.hideError('email_error', email);
      }
      if (!signUpResult.phoneValidation.validationResult) {
        this.showError('phone_error', signUpResult.phoneValidation.validationText, phone);
      } else {
        this.hideError('phone_error', phone);
      }
      if (!signUpResult.nameValidation.validationResult) {
        this.showError('name_error', signUpResult.nameValidation.validationText, name);
      } else {
        this.hideError('name_error', name);
      }
    }
    debugFunc(signUpResult.error, 'error of signup');
  }

  showError(errorLabelId, errorText, ...inputElems) {
    inputElems.forEach((elem) => {
      elem.style.borderColor = 'red';
    });
    document.getElementById(errorLabelId).innerHTML = errorText;
  }

  showErrorFromController(errorText) {
    document.getElementById('password_error').innerHTML = errorText;
  }

  hideError(errorLabelId, ...inputElems) {
    inputElems.forEach((elem) => {
      elem.style.borderColor = 'black';
    });
    document.getElementById(errorLabelId).innerHTML = '';
  }

  hideErrors() {
    const email = document.getElementById('email');
    const name = document.getElementById('name');
    const phone = document.getElementById('phone_number');
    const password = document.getElementById('password');
    const passwordRepeat = document.getElementById('password_repeat');
    this.hideError('name_error', name);
    this.hideError('email_error', email);
    this.hideError('phone_error', phone);
    this.hideError('password_error', password, passwordRepeat);
  }

  /**
   * Method for setting up before rendering elements
   */
  settingUp() {
    const form = document.getElementById('form_submit');
    form.addEventListener('click', this._submitListener.bind(this));
  }

  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    const form = document.getElementById('form_submit');
    form.removeEventListener('click', this._submitListener.bind(this));

    this.parent.innerHTML = '';
  }
}
