import {logoutPost, profileGet} from '../../modules/api.js';

import store from '../../modules/store.js';


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
    profileGet({url: '/profile'})
      .then(() => {
        this.profileRequested = true;
      });
  }

  /**
   * Method rendering Navbar to the parent
   */
  render() {

    const template = Handlebars.templates['navbar.hbs'];


    this.parent.insertAdjacentHTML('afterbegin', template({
      user: store.getState().userState,
      itemNum: this.getNumberOfItems(),
    }));

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
    this.parent.querySelector('.navbar__button-cart-number-wrapper').innerHTML = String(this.getNumberOfItems());
  }

  settingUp() {
    this.updateCartButtonNumber();
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
