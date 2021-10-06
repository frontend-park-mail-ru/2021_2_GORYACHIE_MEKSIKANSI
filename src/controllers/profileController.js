import {ProfileView} from '../views/profileView/profileView.js';
import User from '../modules/user.js';
import ProfileModel from '../models/Profile.js';
import eventBus from '../modules/eventBus.js';
import {ProfileEvents} from '../events/Profile.js';
import {BaseController} from './baseController.js';

/**
 *  Profile controller class
 */
export class ProfileController extends BaseController {
  /**
   * Constructor for controller
   * @param {HTMLElement} parent parent html element
   * @param {Function} routeTo router function for routing
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo,
  }) {
    super();
    this.routeTo = routeTo;
    this.parent = parent;
    this.profileView = new ProfileView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});
    eventBus.addEventListener(ProfileEvents.userLoggedIn, this.profileView.render.bind(this.profileView));
    eventBus.addEventListener(ProfileEvents.userNotAuth, this.routeTo);
  }

  /**
   * Rendering view
   */
  render() {
    if (!User.Auth) {
      ProfileModel.checkAuth();
      return;
    }

    this.profileView.render({});
    this.viewIsActive = true;

    // if (!User.Auth) {
    //   HomeModel.checkAuthAndGetRestaurants();
    //   return;
    // }
    // HomeModel.getRestaurants();
  }

  /**
   * Removing view
   */
  remove() {
    this.profileView.remove();
    this.viewIsActive = false;
  }
}
