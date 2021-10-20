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
      email: {
        key: Validation.validateEmail(mail),
        value: mail,
      },
      phone: {
        key: Validation.validatePhoneNumber(phone),
        value: phone,
      },
      name: {
        key: Validation.validateName(name),
        value: name,
      },
      password: {
        key: Validation.validatePassword(password),
        value: password
      },
      passwordRepeatValidation: Validation.validatePasswordRepeat(password,
        repeatPassword),
    }

    const correctData = {
      name: '',
      phone: '',
      mail: '',
      password: '',
    }

    Object.entries(validation).forEach(([key, value]) => {
        if (value.validationCode === ValidationLength.Incorrect) {

        } else {
          if (value.validationCode !== ValidationLength.EmptyLine) {
            correctData.key =
          }
        }
    })

    if (passwordValidation.validationResult &&
      passwordRepeatValidation.validationResult &&
      emailValidation.validationResult &&
      phoneValidation.validationResult) {
      SignUpModel.signUp({type, name, email, phone, password});
      return {error: false};
    }

    return {
      error: true,
      emailValidation,
      phoneValidation,
      passwordValidation,
      passwordRepeatValidation,
      nameValidation,
    };
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
