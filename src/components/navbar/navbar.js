import {profileGet, logoutPost} from 'Modules/api.js';
import navbar from './navbar.hbs';
import {MapPopup} from '../mapPopup/mapPopup.js';
import {RestaurantEvents} from '../../events/Restaurant';
import Address from 'Modules/lsAddress.js';
import eventBus from 'Modules/eventBus.js';
import {AuthStatus} from 'Events/Auth.js';
import userStore from 'Modules/reducers/userStore.js';
import cartStore from 'Modules/reducers/cartStore.js';
import {ProfileEvents} from '../../events/Profile';

/**
 * Left navigation bar class
 */
export class Navbar {
  /**
   * @param {HTMLElement} parent
   */
  constructor(parent = document.body) {
    this.parent = parent;
    profileGet({});
    this.yMap = new MapPopup({});
    eventBus.addEventListener(ProfileEvents.userDataUpdateSuccess, this.refresh);
  }

  /**
   * Method rendering Navbar to the parent
   */
  render() {
    eventBus.addEventListener(AuthStatus.userLogin, this.refresh);
    this.parent.insertAdjacentHTML('afterbegin', navbar({
      user: userStore.getState(),
      itemNum: this.getNumberOfItems(),
      address: {addr: userStore.getState().address.name},
    }));

    if (userStore.getState().auth) {
      if (userStore.getState().avatar) {
        this.parent.querySelector('.hamburger__profile-img').style.backgroundImage = 'url(' + userStore.getState().avatar + ')';
      }
    }

    this.close();

    this.settingUp();
  }

  refresh = () => {
    this.remove();
    this.render();
  }

  getNumberOfItems = () => {
    if (cartStore.getState().cart !== null && cartStore.getState().cart !== undefined) {
      return cartStore.getState().cart.reduce((prev, item) => {
        prev += item.count;
        return prev;
      }, 0);
    }
    return 0;
  }

  /**
   * Updating address in header
   */
  updateAddressName = (name) => {
    this.parent.querySelector('.map-popup__address').innerHTML = String(name);
  }

  updateCartButtonNumber = () => {
    const buttonCartNumber = this.parent.querySelector('.navbar__button-cart-number-wrapper');
    if (buttonCartNumber) {
      buttonCartNumber.innerHTML = String(this.getNumberOfItems());
    }
  }

  settingUp() {
    this.updateCartButtonNumber();
    this.yMap.render();
    this.parent.querySelector('.nav-button').addEventListener('click', this.openListener);
    this.parent.querySelector('.hamburger-wrapper').addEventListener('click', this.closeListener);
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

    const navbar = this.parent.querySelector('.hamburger');


    if (navbar && !navbar.contains(target)) {
      this.close();
    }
  }

  logout = (event) => {
    event.preventDefault();
    logoutPost(); // TODO: solve the problem of direct api use...
  }

  /**
   * Method opening overlay navbar
   */
  open() {
    window.document.body.style.overflowY = 'hidden';
    this.parent.getElementsByClassName('hamburger')[0].style.display = 'flex';
    this.parent.getElementsByClassName('hamburger-wrapper')[0]
        .style.display = 'block';
  }

  /**
   * Closing overlay action
   */
  close() {
    window.document.body.style.overflowY = 'scroll';
    this.parent.getElementsByClassName('hamburger')[0].style.display = 'none';
    this.parent.getElementsByClassName('hamburger-wrapper')[0]
        .style.display = 'none';
  }

  /**
   * Remove event listeners relates for navbar
   */
  remove() {
    this.yMap.remove();
    if (document.querySelector('.hamburger-wrapper') &&
      document.querySelector('.navbar')) {
      this.parent.querySelector('.nav-button').removeEventListener('click', this.openListener);
      this.parent.querySelector('.hamburger-wrapper').removeEventListener('click', this.closeListener);
      this.parent.querySelectorAll('a').forEach((item) => {
        if (item.hasAttribute('href')) {
          if (item.getAttribute('href') === 'logout') {
            item.removeEventListener('click', this.logout);
          }
        }
      });

      document.querySelector('.hamburger-wrapper').remove();
      document.querySelector('.navbar').remove();
      window.document.body.style.overflowY = 'scroll';
    }
    eventBus.unsubscribe(AuthStatus.userLogin, this.refresh);
  }
}

export default new Navbar();
