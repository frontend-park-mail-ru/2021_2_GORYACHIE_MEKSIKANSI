import {ProfileView} from '../views/profileViews/profileView/profileView.js';
import eventBus from '../modules/eventBus.js';
import {ProfileEvents} from '../events/Profile.js';
import {AuthStatus} from '../events/Auth.js';

import store from '../modules/store.js';

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
    this.getProfile = false;  // TODO: придумать с этим что то, потому что это пиздец...
    eventBus.addEventListener(AuthStatus.userLogin, () => {this.getProfile = true});
    eventBus.addEventListener(AuthStatus.notAuth, () => {this.getProfile = true});
  }

  /**
   * Rendering view
   */
  render() {
    if (this.getProfile === false) {
      eventBus.addEventListener(AuthStatus.userLogin, this.show);
      eventBus.addEventListener(AuthStatus.notAuth, () => { this.routeTo('/');
        eventBus.unsubscribe(AuthStatus.notAuth);
        eventBus.unsubscribe(AuthStatus.userLogin); });
    }
    if (this.getProfile === true) {
      if (!store.getState().userState.auth) {
          this.routeTo('/');
      } else {
        this.profileView.render();
      }
    }
  }

  show = () => {
    this.profileView.render();
    eventBus.unsubscribe(AuthStatus.userLogin);
    eventBus.unsubscribe(AuthStatus.notAuth);
  }

  /**
   * Removing view
   */
  remove() {
    this.profileView.remove();
  }
}
