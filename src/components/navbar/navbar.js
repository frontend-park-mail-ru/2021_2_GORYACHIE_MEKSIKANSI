import styles from './navbar.scss';
import {profileGet, logoutPost} from 'Modules/api.js';
import navbar from './navbar.hbs';
import {MapPopup} from '../mapPopup/mapPopup.js';
import eventBus from 'Modules/eventBus.js';
import {AuthStatus} from 'Events/Auth.js';
import userStore from 'Modules/reducers/userStore.js';
import cartStore from 'Modules/reducers/cartStore.js';
import {ProfileEvents} from '../../events/Profile';
import {SearchEvents} from '../../events/Search';
import Socket from 'Modules/webSocket';
import {CreateSnack} from 'Components/snackBar/snackBar'
import {statusMap} from "../../modules/consts";

/**
 * switching theme crutch
 * @param {event} e
 */
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

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
    Socket.subscribe(this.navbarWSHandler.bind(this));
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

  /**
   * Rerendering navbar
   */
  refresh = () => {
    this.remove();
    this.render();
  }

  /**
   * WebSocket handler to update order status
   * @param {object} message
   */
  navbarWSHandler = (message) => {
    const body = message.body.web_socket;
    if (body.action === 'status') {
      CreateSnack({
        title: `Статус заказа ${body.order.id} обновлен на: ${statusMap[body.order.status]}`,
        status: 'green',
      });
    }
  }

  /**
   * Getting amount of items in cart
   * @return {int}
   */
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
   * @param {string} name
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

  /**
   * Setting navbar settings to render
   */
  settingUp() {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

    // toggleSwitch.addEventListener('change', switchTheme, false);
    this.updateCartButtonNumber();
    this.yMap.render();
    this.parent.querySelector('.nav-button').addEventListener('click', this.openListener);
    this.parent.querySelector('.hamburger-wrapper').addEventListener('click', this.closeListener);
    document.getElementById('search-icon').onclick = this.makeSearch;
    if (userStore.getState().auth) {
      document.getElementById('logout').addEventListener('click', this.logout);
    }
    window.addEventListener('keypress', this.makeSearchByEnter);
  }

  /**
   * Listener for Enter key
   * @param {Object} e
   */
  makeSearchByEnter = (e) => {
    if (e.key === 'Enter') {
      this.makeSearch();
    }
  }

  makeSearch = () => {
    const searchText = document.getElementById('search-input').value;
    if (searchText.length !== 0) {
      eventBus.emitEventListener(SearchEvents.searchRequest, searchText);
    }
  }

  /**
   * Opening listener of event
   * @param {event} event
   */
  openListener = (event) => {
    event.preventDefault();
    this.open();
  }

  /**
   * Closing listener of event
   * @param {event} event
   */
  closeListener = (event) => {
    event.preventDefault();
    const {target} = event;

    const navbar = this.parent.querySelector('.hamburger');


    if (navbar && !navbar.contains(target)) {
      this.close();
    }
  }

  /**
   * Logout button event
   * @param {event} event
   */
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
    Socket.unsubscribe(this.navbarWSHandler);
    this.yMap.remove();
    window.removeEventListener('keypress', this.makeSearchByEnter);


    if (document.querySelector('.hamburger-wrapper') &&
      document.querySelector('.navbar')) {
      this.parent.querySelector('.nav-button').removeEventListener('click', this.openListener);
      this.parent.querySelector('.hamburger-wrapper').removeEventListener('click', this.closeListener);

      const logoutButton = document.getElementById('logout');
      if (logoutButton) {
        logoutButton.removeEventListener('click', this.logout);
      }
      // const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

      // toggleSwitch.removeEventListener('change', switchTheme, false);

      document.querySelector('.hamburger-wrapper').remove();
      document.querySelector('.navbar').remove();
      window.document.body.style.overflowY = 'scroll';
    }
    eventBus.unsubscribe(AuthStatus.userLogin, this.refresh);
  }
}

export default new Navbar();
