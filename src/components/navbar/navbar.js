import User from '../../modules/user.js';
import eventBus from '../../modules/eventBus.js';
import {AuthStatus} from '../../events/Auth.js';

/**
 * Left navigation bar class
 */
export class Navbar {
  /**
   * @param {HTMLElement} parent
   */
  constructor(parent = document.body) {
    this.parent = parent;
    this.opened = false;

    this.parent.addEventListener('click', this.openListener.bind(this));
  }

  /**
   * Navbar listener monitoring open, close, logout actions
   * @param {Object} event js event
   */
  openListener(event) {
    const {target} = event;

    const navbar = this.parent.getElementsByClassName('navbar')[0];

    if (this.opened && navbar !== undefined && !navbar.contains(event.target)) {
      this.close();
    } else if (target.getAttribute('href') === 'logout' && User.Auth) {
      eventBus.emitEventListener(AuthStatus.userLogout, {});
      eventBus.unsubscribe(AuthStatus.userLogout);
    } else if (target.getAttribute('href') === 'navbar') {
      this.open();
    }
  }

  /**
   * Method rendering Navbar to the parent
   */
  render() {
    const template = Handlebars.templates['navbar.hbs'];
    this.parent.innerHTML = template({user:
        {auth: User.Auth, name: User.name},
    });
    this.close();
  }

  /**
   * Method opening overlay navbar
   */
  open() {
    window.document.body.style.overflowY = 'hidden';
    this.parent.getElementsByClassName('navbar')[0].style.display = 'flex';
    this.parent.getElementsByClassName('navbar-wrapper')[0].
        style.display = 'block';
    this.opened = true;
  }

  /**
   * Closing overlay action
   */
  close() {
    window.document.body.style.overflowY = 'scroll';
    this.parent.getElementsByClassName('navbar')[0].style.display = 'none';
    this.parent.getElementsByClassName('navbar-wrapper')[0].
        style.display = 'none';
    this.opened = false;
  }

  /**
   * Remove event listeners relates for navbar
   */
  remove() {
    this.parent.removeEventListener('click', this.openListener.bind(this));
  }
}
