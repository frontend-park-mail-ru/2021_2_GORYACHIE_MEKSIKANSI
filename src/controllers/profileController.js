import {ProfileView} from '../views/profileViews/profileView/profileView.js';
import eventBus from '../modules/eventBus.js';
import {ProfileEvents} from '../events/Profile.js';
import {AuthStatus} from '../events/Auth.js';
import {ValidationLength} from '../events/Validation.js';

import store from '../modules/store.js';
import Navbar from '../components/navbar/navbar.js';
import {Validation} from '../modules/validation.js';
import SignUpModel from "../models/SignUp.js";

/**
 *  Profile controller class
 */
export class ProfileController {
  /**
   * Constructor for controller
   * @param {HTMLElement} parent parent html element
   * @param {Function} routeTo router function for routing
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo,
  }) {
    this.routeTo = routeTo;
    this.parent = parent;
    this.profileView = new ProfileView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});
    eventBus.addEventListener(ProfileEvents.userLoggedIn,
        this.profileView.render.bind(this.profileView));
    eventBus.addEventListener(ProfileEvents.userNotAuth, this.routeTo);
  }

  dataChange(name, phone, mail, avatar, password, repeatPassword) {
    const validation = {
      cMail: {
        key: Validation.validateEmail(mail),
        value: mail,
      },
      cPhone: {
        key: Validation.validatePhoneNumber(phone),
        value: phone,
      },
      cName: {
        key: Validation.validateName(name),
        value: name,
      },
      cPassword: {
        key: Validation.validatePassword(password),
        value: password
      },
      cRepeatPassword: {
        key: Validation.validatePasswordRepeat(password,
            repeatPassword),
        value: repeatPassword,
      },
    }

    const incorrectData = {
      cName: '',
      cPhone: '',
      cMail: '',
      cPassword: '',
      cRepeatPassword: '',
    }
    const correctData = {
      cName: '',
      cPhone: '',
      cMail: '',
      cPassword: '',
    }

    Object.entries(validation).forEach(([key, value]) => {
        if (value.key.validationCode === ValidationLength.Incorrect || value.key.validationCode === ValidationLength.EmptyLine) {
          incorrectData[key] = value.key;
        } else {
          if (value.key.validationCode !== ValidationLength.EmptyLine && key in correctData) {
            correctData[key] = value.value
          }
        }
    })

    Object.entries(correctData).forEach(([key, value]) => {
      if (value === '') {
        delete correctData[key];
      }
    })

    Object.entries(incorrectData).forEach(([key, value]) => {
      if (value === '') {
        delete incorrectData[key];
      }
    })

    if (incorrectData['cRepeatPassword'] !== '') {
      delete correctData['cPassword'];
    }
    console.log(Object.entries(correctData));
    console.log(Object.entries(incorrectData));

  }

  /**
   * Rendering view
   */
  render() {
    if (Navbar.profileRequested) {
      this.show();
    } else {
      eventBus.addEventListener(AuthStatus.userDataGot, this.show);
    }
  }

  show = () => {
    eventBus.unsubscribe(AuthStatus.userDataGot);
    if (store.getState().userState.auth) {
      this.profileView.render();
    } else {
      this.routeTo('/');
    }
  }

  /**
   * Removing view
   */
  remove() {
    this.profileView.remove();
  }
}
