import {ProfileView} from '../views/profileViews/profileView/profileView.js';
import eventBus from '../modules/eventBus.js';
import {ProfileEvents} from '../events/Profile.js';
import {AuthStatus} from '../events/Auth.js';
import ProfileModel from '../models/Profile.js';

import store from '../modules/store.js';
import Navbar from '../components/navbar/navbar.js';

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
    if (Navbar.profileRequested) {
      this.show();
    } else {
      eventBus.addEventListener(AuthStatus.userDataGot, this.show);
    }
  }

  show = () => {
    eventBus.unsubscribe(AuthStatus.userDataGot);
    if (store.getState().userState.auth) {
      this.profileView.render();
    } else {
      this.routeTo('/');
    }
  }

  /**
   * Removing view
   */
  remove() {
    this.profileView.remove();
  }
}
