import {View} from '../baseView/View.js';
import {LoginController} from '../../controllers/loginController.js';
import loginPage from './loginPage.hbs'

/**
 * View for Login Page
 */
export class LoginView extends View {
  /**
   * Constructor for login view
   * @param {HTMLElement} parent
   * @param {Function} routeTo
   * @param {Object} controller
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller = new LoginController({
      parent: parent,
      routeTo: routeTo}),
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
    this.parent.innerHTML = loginPage({});

    this.settingUp();
  }

  /**
   * Method calling by
   * @param {Object} event
   * @private
   */
  submitListener(event) {
    const login = document.getElementById('login');
    const password = document.getElementById('password');
    event.preventDefault();
    const loginResult = this.controller.login(login.value, password.value);

    if (loginResult.error) {
      this.showError('Некорректный логин или пароль');
    }
  }

  /**
   * Show error under login form
   * @param {string} errorText
   */
  showError(errorText) {
    const login = document.getElementById('login');
    const password = document.getElementById('password');
    login.style.borderColor = 'red';
    password.style.borderColor = 'red';

    const errorLabel = document.getElementById('error_label');
    errorLabel.innerHTML = errorText;
  }

  /**
   * Hide error under login form
   */
  hideError() {
    document.getElementById('login').style.borderColor = 'black';
    document.getElementById('password').style.borderColor = 'black';
    document.getElementById('error_label').innerHTML = '';
  }

  /**
   * Method for setting up before rendering elements
   */
  settingUp() {
    const form = document.getElementById('form_submit');
    form.addEventListener('click', this.submitListener.bind(this));
  }

  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    const form = document.getElementById('form_submit');
    if (form) {
      form.removeEventListener('click', this.submitListener.bind(this));
    }

    this.parent.innerHTML = '';
  }
}
