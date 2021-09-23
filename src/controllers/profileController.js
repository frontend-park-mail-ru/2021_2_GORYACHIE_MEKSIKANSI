import {HomeView} from '../views/homeView/homeView.js';
import {ProfileView} from '../views/profileView/profileView.js';
import User from '../modules/user.js';

export class ProfileController {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
  }) {
    this.routeTo = routeTo;
    this.parent = parent;
    this.profileView = new ProfileView({parent: parent, routeTo: this.routeTo, controller: this});
  }

  render() {
    if (User.Auth === undefined || !User.Auth) {
      this.routeTo('login');
      return;
    }

    this.profileView.render({});
  }

  remove() {
    this.profileView.remove();
  }
}
