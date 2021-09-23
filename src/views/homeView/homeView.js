import {View} from '../View.js';
import {Navbar} from '../../components/navbar/navbar.js';
import User from '../../modules/user.js';

export class HomeView extends View {
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
    this.navbar = new Navbar(parent);
  }
  /**
   * Method that render login page in inner HTML of element
   */
  render(props = {}) {
    this.navbar.render();
    const template = Handlebars.templates['homePage.hbs'];
    this.parent.innerHTML += template({restaurantList: props.restaurantList, auth: User.Auth});

    this.settingUp();
  }

  /**
   * Method calling by
   * @param event
   * @private
   */
  _submitListener(event) {}

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
