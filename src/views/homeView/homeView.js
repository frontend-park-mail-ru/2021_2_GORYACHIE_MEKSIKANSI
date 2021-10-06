import {View} from '../baseView/View.js';
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
    this.navbar = new Navbar(parent);
  }
  /**
   * Method that render login page in inner HTML of element
   * @param {Object} props
   */
  render(props = {}) {
    this.navbar.render();
    const template = Handlebars.templates['page.hbs'];
    this.parent.innerHTML += template({
      head: Handlebars.templates['header.hbs']({auth: User.Auth}),
      content: Handlebars.templates['homePage.hbs']({
        promos: [1, 2, 3],
        restaurantList: props.restaurantList,
      })});

    this.settingUp();
  }

  /**
   * Method calling by
   * @param {name} event
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
