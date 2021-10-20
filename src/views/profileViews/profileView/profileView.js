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
    this.parent.innerHTML += template({
      pageTitle: 'Личные данные',
      content: Handlebars.templates['profilePage1.hbs']({
        user: store.getState().userState,
      }),
      rightMenu: Handlebars.templates['profileButtonsNav.hbs']});

    document.querySelector('.profile-avatar').style.backgroundImage = 'url(' + store.getState().userState.avatar + ')';
    document.querySelector('.profile-avatar').addEventListener('click', () => {document.getElementById('avatar').click();});
    document.getElementById('avatar').onchange = this.checkImage;

    document.querySelector('.footer').style.marginTop = '0';
    const form = document.getElementById('save-button');
    console.log(form);
    form.addEventListener('click', this.submitListener.bind(this));
  }

  checkImage = () => {
    const [file] = document.getElementById('avatar').files
    if (file) {
      console.log('Image clicked!');
        // this.controller.checkImage();
    }
  }

  showImage = (file) => {
    document.querySelector('.profile-avatar').style.backgroundImage = 'url(' + URL.createObjectURL(file) + ')';
  }

  deleteImage = () => {
    console.log('Image size overflow');
    document.getElementById('avatar').value = '';
  }


  sendImage = () => {
    const [file] = document.getElementById('avatar').files;
    if (file) {
      // document.querySelector('.profile-avatar').style.backgroundImage = 'url(' + URL.createObjectURL(file) + ')';
      console.log(file);
      console.log(URL.createObjectURL(file));
    }
  }


  /**
   * Method calling by
   * @param {Object} event
   * @private
   */
  submitListener(event) {
    event.preventDefault();
    const name = document.getElementById('name');
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeatPassword');
    const mail = document.getElementById('mail');
    const phone = document.getElementById('phone');
    this.controller.dataChange(name.value, phone.value, mail.value, '', password.value,repeatPassword.value);
  }

  /**
   * Method for setting up before rendering elements
   */
  settingUp() {
    const form = document.getElementById('save-button');
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
