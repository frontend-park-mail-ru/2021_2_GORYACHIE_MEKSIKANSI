import {ProfileView} from '../views/profileView/profileView.js';
import User from '../modules/user.js';

/**
 *  Profile controller class
 */
export class ProfileController {
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
    this.profileView = new ProfileView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});
  }

  /**
   * Rendering view
   */
  render() {
    if (User.Auth === undefined || !User.Auth) {
      this.routeTo('login');
      return;
    }

    this.profileView.render({});
  }

  /**
   * Removing view
   */
  remove() {
    this.profileView.remove();
  }
}
