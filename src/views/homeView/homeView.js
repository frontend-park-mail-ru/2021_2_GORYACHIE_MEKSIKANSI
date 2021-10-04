import {View} from '../View.js';
import {Navbar} from '../../components/navbar/navbar.js';
import User from '../../modules/user.js';

/**
 * Home view class
 */
export class HomeView extends View {
  /**
   *
   * @param {HTMLElement} parent
   * @param {Function} routeTo
   * @param {Class}controller
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
   * @param {Object} props
   */
  render(props = {}) {
    this.navbar = new Navbar(this.parent);
    this.navbar.render();
    const template = Handlebars.templates['homePage.hbs'];
    this.parent.innerHTML += template({restaurantList: props,
      auth: User.Auth});

    this.settingUp();
  }

  /**
   * Method for setting up before rendering elements
   */
  settingUp() {}

  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    this.navbar.remove();
    this.parent.innerHTML = '';
  }
}
