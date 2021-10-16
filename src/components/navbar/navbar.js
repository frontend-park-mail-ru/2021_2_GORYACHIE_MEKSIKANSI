<<<<<<< HEAD
import {profileGet, logoutPost} from 'Modules/api.js';
import navbar from './navbar.hbs'
import store from 'Modules/store.js';

=======
import User from '../../modules/user.js';
import eventBus from '../../modules/eventBus.js';
import {AuthStatus} from '../../events/Auth.js';
import {MapPopup} from '../mapPopup/mapPopup.js';
import {profileGet} from '../../modules/api.js';
>>>>>>> map added, work in progress

/**
 * Left navigation bar class
 */
export class Navbar {
  /**
   * @param {HTMLElement} parent
   */
  constructor(parent = document.body) {
    this.parent = parent;
    this.profileRequested = false;
    profileGet({url: '/user'})
      .then(() => {
        this.profileRequested = true;
      });
    this.yMap = new MapPopup({});
  }

  /**
   * Method rendering Navbar to the parent
   */
  render() {
    this.parent.insertAdjacentHTML('afterbegin', navbar({
      user: store.getState().userState,
      itemNum: this.getNumberOfItems(),
    }));

    if (store.getState().userState.auth) {
      if (store.getState().userState.avatar) {
        this.parent.querySelector('.nav-profile__img').style.backgroundImage = 'url(' + store.getState().userState.avatar + ')';
      }
    }

    this.close();

    this.settingUp();
  }

  getNumberOfItems = () => {
    return store.getState().cartState.reduce((prev, item) => {
      prev += item.num;
      return prev;
    }, 0);
  }

  updateCartButtonNumber = () => {
    const buttonCartNumber = this.parent.querySelector('.navbar__button-cart-number-wrapper');
    if (buttonCartNumber) {
      buttonCartNumber.innerHTML = String(this.getNumberOfItems());
    }
  }

  settingUp() {
<<<<<<< HEAD
    this.updateCartButtonNumber();
=======
    this.yMap.render();
>>>>>>> map added, work in progress
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
    logoutPost();  // TODO: solve the problem of direct api use...
  }

  /**
   * Method opening overlay navbar
   */
  open() {
    window.document.body.style.overflowY = 'hidden';
    this.parent.getElementsByClassName('navbar')[0].style.display = 'flex';
    this.parent.getElementsByClassName('navbar-wrapper')[0]
      .style.display = 'block';
  }

  /**
   * Closing overlay action
   */
  close() {
    window.document.body.style.overflowY = 'scroll';
    this.parent.getElementsByClassName('navbar')[0].style.display = 'none';
    this.parent.getElementsByClassName('navbar-wrapper')[0]
      .style.display = 'none';
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
      window.document.body.style.overflowY = 'scroll';
    }
  }
}

export default new Navbar();
