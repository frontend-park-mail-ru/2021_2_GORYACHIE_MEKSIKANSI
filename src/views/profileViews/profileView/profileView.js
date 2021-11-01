import {View} from '../../baseView/View.js';
import Navbar from 'Components/navbar/navbar.js';
import {updateName} from 'Modules/api.js';
import baseProfilePage from '../baseProfilePage.hbs';
import profilePage from './profilePage1.hbs';
import profileButtonsNav from 'Components/profileButtonsNav/profileButtonsNav.hbs';
import userStore from 'Modules/reducers/userStore.js';
import {AddressPopup} from '../addressView/addressView.js';

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
    this.parent.innerHTML += baseProfilePage({
      pageTitle: 'Личные данные',
      content: profilePage({
        user: userStore.getState(),
      }),
      rightMenu: profileButtonsNav});

    document.querySelector('.profile-avatar').style.backgroundImage = 'url(' + userStore.getState().avatar + ')';
    document.querySelector('.profile-avatar').addEventListener('click', () => {document.getElementById('avatar').click();});
    document.getElementById('avatar').onchange = this.checkImage;

    document.querySelector('.footer').style.marginTop = '0';
    const form = document.getElementById('save-button');
    form.addEventListener('click', this.submitListener.bind(this));

    this.inputs = {
      cName: {
        input: document.getElementById('name'),
        error: document.getElementById('name_error'),
      },
      cPhone: {
        input: document.getElementById('phone'),
        error: document.getElementById('phone_error'),
      },
      cMail: {
        input: document.getElementById('email'),
        error: document.getElementById('email_error'),
      },
      cPassword: {
        input: document.getElementById('password'),
        error: document.getElementById('password_error'),
      },
      cRepeatPassword: {
        input: document.getElementById('repeat_password'),
        error: document.getElementById('password_repeat_error'),
      },
    };
  }

  checkImage = () => {
    const [file] = document.getElementById('avatar').files
    if (file) {
        // this.controller.checkImage();
    }
  }

  showImage = (file) => {
    document.querySelector('.profile-avatar').style.backgroundImage = 'url(' + URL.createObjectURL(file) + ')';
  }

  deleteImage = () => {
    document.getElementById('avatar').value = '';
  }


  sendImage = () => {
    const [file] = document.getElementById('avatar').files;
    if (file) {
      // document.querySelector('.profile-avatar').style.backgroundImage = 'url(' + URL.createObjectURL(file) + ')';
    }
  }


  /**
   * Method calling by
   * @param {Object} event
   * @private
   */
  submitListener(event) {
    event.preventDefault();
    this.controller.dataChange(...Object.values(this.inputs).map((obj) => {return obj.input.value}), '');
  }

  showErrors = (incorrectData = {}) => {
    Object.entries(this.inputs).forEach(([key, value]) => {
      value.input.style.borderColor = '#e2e2e2';
      value.error.innerHTML = '';
    });
    Object.entries(incorrectData).forEach(([key, value]) => {
      this.inputs[key].input.style.borderColor = 'red';
      this.inputs[key].error.innerHTML = value.validationText;
    });
  }

  showInfo = (infoText) => {
    this.parent.querySelector('.info-label').innerText = infoText;
  }

  showError = (errorText) => {
    this.parent.querySelector('.main-error-label').innerText = errorText;
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
