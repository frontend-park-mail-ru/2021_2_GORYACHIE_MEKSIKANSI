import {View} from '../View.js';
import {debugFunc} from '../../modules/debugMod.js';

/**
 * View for Login Page
 */
export class LoginView extends View {
  /**
   *
   * @param parent
   * @param routeTo
   * @param controller
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller,
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
  render({props}) {
    const template = Handlebars.templates['loginPage.hbs'];
    this.parent.innerHTML = template({});

    this.settingUp();
  }

  /**
   * Method calling by
   * @param event
   * @private
   */
  _submitListener(event) {
    const login = document.getElementById('login');
    const password = document.getElementById('password');
    console.log(login.value, password.value);
    console.log(this.controller);
    event.preventDefault();
    const loginResult = this.controller.login(login.value, password.value);

    if (loginResult.error) {
      debugFunc(loginResult.error, 'login error, smth wrong');
    }
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
    const form = document.getElementById('form');
    form.removeEventListener('click', this._submitListener.bind(this));

    this.parent.innerHTML = '';
  }
}
