import {View} from '../../baseView/View.js';
import Navbar from '../../../components/navbar/navbar.js';
import store from '../../../modules/store.js';


/**
 * Profile view class
 */
export class ProfileView extends View {
  /**
   *
   * @param {HTMLElement} parent
   * @param {Function} routeTo
   * @param {Class} controller
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller,
  }) {
    super({
      parent: parent,
      routeTo: routeTo,
      controller: controller,
    });
    this.navbar = Navbar;
  }

  /**
   * Method that render login page in inner HTML of element
   * @param {Object} props objects relating for rendering view
   */
  render(props = {}) {
    this.navbar.render();
    const template = Handlebars.templates['baseProfilePage.hbs'];
    console.log(store.getState().userState);
    this.parent.innerHTML += template({
      pageTitle: 'Личные данные',
      content: Handlebars.templates['profilePage1.hbs']({
        user: store.getState().userState,
      }),
      rightMenu: Handlebars.templates['profileButtonsNav.hbs']});
    document.querySelector('.footer').style.marginTop = '0';
  }

  /**
   * Method calling by
   * @param {string} event
   */
  submitListener(event) {}

  /**
   * Method for setting up before rendering elements
   */
  settingUp() {
    const form = document.getElementById('form_submit');
    form.addEventListener('click', this.submitListener.bind(this));
  }

  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    if (this.navbar) {
      this.navbar.remove();
    }
    this.parent.innerHTML = '';
  }
}
