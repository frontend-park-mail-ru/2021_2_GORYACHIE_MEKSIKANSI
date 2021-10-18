import User from '../../modules/user.js';
import eventBus from '../../modules/eventBus.js';
import {AuthStatus} from '../../events/Auth.js';
import {MapPopup} from '../mapPopup/mapPopup.js';
import {profileGet} from '../../modules/api.js';
import Address from '../../modules/lsAddress.js';

/**
 * Left navigation bar class
 */
export class Navbar {
  /**
   * @param {HTMLElement} parent
   */
  constructor(parent = document.body) {
    this.parent = parent;
    profileGet({url: '/profile'});
    this.map = new MapPopup({});
  }

  /**
   * Updating address in header
   */
  updateAddressName = (name) => {
    this.parent.querySelector('.navbar__button-cart-number-wrapper').innerHTML = String(name);
  }

  /**
   * Method rendering Navbar to the parent
   */
  render() {
    const template = Handlebars.templates['navbar.hbs'];
    this.parent.insertAdjacentHTML('afterbegin', template({
      user: {auth: User.Auth, name: User.name},
      address: {addr: Address.getAddress().name},
    }));

    this.close();

    this.settingUp();
  }

  settingUp() {
    this.map.render();
    this.parent.querySelector('.nav-button').addEventListener('click', this.openListener);
    this.parent.querySelector('.navbar-wrapper').addEventListener('click', this.closeListener);
    this.parent.querySelectorAll('a').forEach((item) => {
      if (item.hasAttribute('href')) {
        if (item.getAttribute('href') === 'logout') {
          item.addEventListener('click', this.logout);
        }
      }
    });
  }

  openListener = (event) => {
    event.preventDefault();
    this.open();
  }

  closeListener = (event) => {
    event.preventDefault();
    const {target} = event;

    const navbar = this.parent.querySelector('.navbar');


    if (navbar && !navbar.contains(target)) {
      this.close();
    }
  }

  logout = (event) => {
    event.preventDefault();
    eventBus.emitEventListener(AuthStatus.userLogout, {});
  }

  /**
   * Method opening overlay navbar
   */
  open() {
    window.document.body.style.overflowY = 'hidden';
    this.parent.getElementsByClassName('navbar')[0].style.display = 'flex';
    this.parent.getElementsByClassName('navbar-wrapper')[0].
        style.display = 'block';
  }

  /**
   * Closing overlay action
   */
  close() {
    window.document.body.style.overflowY = 'scroll';
    this.parent.getElementsByClassName('navbar')[0].style.display = 'none';
    this.parent.getElementsByClassName('navbar-wrapper')[0].
        style.display = 'none';
  }

  /**
   * Remove event listeners relates for navbar
   */
  remove() {
    if (document.querySelector('.navbar-wrapper') &&
      document.querySelector('.header')) {
      this.parent.querySelector('.nav-button').removeEventListener('click', this.openListener);
      this.parent.querySelector('.navbar-wrapper').removeEventListener('click', this.closeListener);
      this.parent.querySelectorAll('a').forEach((item) => {
        if (item.hasAttribute('href')) {
          if (item.getAttribute('href') === 'logout') {
            item.removeEventListener('click', this.logout);
          }
        }
      });

      document.querySelector('.navbar-wrapper').remove();
      document.querySelector('.header').remove();
    }
  }
}

export default new Navbar();
