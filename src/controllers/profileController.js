import {ProfileView} from '../views/profileViews/profileView/profileView.js';
import ProfileModel from '../models/Profile.js';
import eventBus from '../modules/eventBus.js';
import {ProfileEvents} from '../events/Profile.js';

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
    routeTo: routeTo,
  }) {
    this.routeTo = routeTo;
    this.parent = parent;
    this.profileView = new ProfileView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});
    eventBus.addEventListener(ProfileEvents.userLoggedIn,
        this.profileView.render.bind(this.profileView));
    eventBus.addEventListener(ProfileEvents.userNotAuth, this.routeTo);
  }

  /**
   * Rendering view
   */
  render() {
    ProfileModel.checkAuth();
  }

  /**
   * Removing view
   */
  remove() {
    this.profileView.remove();
  }
}
