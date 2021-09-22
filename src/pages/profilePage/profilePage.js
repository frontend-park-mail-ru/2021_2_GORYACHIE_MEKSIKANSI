import {Navbar} from '../../components/navbar/navbar.js';

/**
 * Class that render ProfilePage
 */
export class ProfilePage {
  /**
   * Construct ProfilePage class
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    this.navbar = new Navbar(parent);
    this.parent = parent;
  }
  /**
   * method that render profile page in inner HTML of element
   */
  render() {
    window.document.getElementsByClassName('footer')[0].style.marginTop = '0';
    this.navbar.render();
    const template = Handlebars.templates['profilePage1.hbs'];
    this.parent.innerHTML += template({});
  }
}
