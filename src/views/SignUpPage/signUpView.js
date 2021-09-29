import {View} from '../View.js';
import {SignUpController} from '../../controllers/signUpController.js';
import {debugFunc} from '../../modules/debugMod.js';

/**
 * SignUp View Class
 */
export class SignUpView extends View {
  /**
   * Constructor for signup view
   * @param {HTMLElement} parent
   * @param {Function} routeTo
   * @param {Object} controller
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller = new SignUpController({
      parent: parent,
      routeTo: routeTo()}),
  }) {
    super({
      parent: parent,
      routeTo: routeTo,
      controller: controller,
    });
  }
  /**
   * Method that render login page in inner HTML of element
   * @param {Object} props objects relating for rendering view
   */
  render(props = {}) {
    const template = Handlebars.templates['signUpPage.hbs'];
    this.parent.innerHTML = template({});

    this.settingUp();
  }

  /**
   * Method calling by
   * @param {Object} event
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
    const signUpResult = this.controller.signUp(type,
        name.value,
        email.value,
        phone.value,
        password.value,
        passwordRepeat.value);

    if (signUpResult.error) {
      if (!signUpResult.passwordValidation.validationResult) {
        this.showError('password_error',
            signUpResult.passwordValidation.validationText,
            password,
            passwordRepeat);
      } else if (!signUpResult.passwordRepeatValidation.validationResult) {
        this.showError('password_error',
            signUpResult.passwordRepeatValidation.validationText,
            password,
            passwordRepeat);
      } else {
        this.hideError('password_error', password, passwordRepeat);
      }
      if (!signUpResult.emailValidation.validationResult) {
        this.showError('email_error',
            signUpResult.emailValidation.validationText,
            email);
      } else {
        this.hideError('email_error', email);
      }
      if (!signUpResult.phoneValidation.validationResult) {
        this.showError('phone_error',
            signUpResult.phoneValidation.validationText,
            phone);
      } else {
        this.hideError('phone_error', phone);
      }
      if (!signUpResult.nameValidation.validationResult) {
        this.showError('name_error',
            signUpResult.nameValidation.validationText,
            name);
      } else {
        this.hideError('name_error', name);
      }
    }
    debugFunc(signUpResult.error, 'error of signup');
  }

  /**
   * Show error with relating text
   * @param {string} errorLabelId input element append text into it
   * @param {string} errorText error text
   * @param {HTMLElement} inputElems input html elements to light it red
   */
  showError(errorLabelId, errorText, ...inputElems) {
    inputElems.forEach((elem) => {
      elem.style.borderColor = 'red';
    });
    document.getElementById(errorLabelId).innerHTML = errorText;
  }

  /**
   * Show standard error under forms with needed text
   * @param {string} errorText error text
   */
  showErrorFromController(errorText) {
    document.getElementById('password_error').innerHTML = errorText;
  }

  /**
   * Hide error relating to label id and input form
   * @param {string} errorLabelId input element append text into it
   * @param {HTMLElement} inputElems input html elements to light it red
   */
  hideError(errorLabelId, ...inputElems) {
    inputElems.forEach((elem) => {
      elem.style.borderColor = 'black';
    });
    document.getElementById(errorLabelId).innerHTML = '';
  }

  /**
   * Hiding errors when data is valid
   */
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
