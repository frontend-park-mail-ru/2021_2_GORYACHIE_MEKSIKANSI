import {View} from '../View.js';
import {Navbar} from '../../components/navbar/navbar.js';
import User from '../../modules/user.js';


/**
 * Profile view class
 */
export class ProfileView extends View {
  /**
   *
   * @param {HTMLElement} parent
   * @param {Function} routeTo
   * @param {Class} controller
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
    this.navbar = new Navbar(parent);
  }

  /**
   * Method that render login page in inner HTML of element
   * @param {Object} props objects relating for rendering view
   */
  render(props = {}) {
    this.navbar.render();
    const template = Handlebars.templates['profilePage1.hbs'];
    this.parent.innerHTML += template({user:
        {
          name: User.name,
          phone: User.phone,
          email: User.email}, auth: User.Auth,
    });
    document.querySelector('.footer').style.marginTop = '0';
  }

  /**
   * Method calling by
   * @param {string} event
   */
  submitListener(event) {}

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
    this.navbar.remove();
    this.parent.innerHTML = '';
  }
}
