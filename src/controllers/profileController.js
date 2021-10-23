import {ProfileView} from 'Views/profileViews/profileView/profileView.js';
import eventBus from 'Modules/eventBus.js';
import {ProfileEvents} from 'Events/Profile.js';
import {AuthStatus} from 'Events/Auth.js';
import {ValidationLength} from 'Events/Validation.js';

import store from 'Modules/store.js';
import {Validation} from 'Modules/validation.js';
import ProfileModel from 'Models/Profile.js';
import {userStatus} from "../modules/store";

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
    eventBus.addEventListener(ProfileEvents.userDataUpdateSuccess, () => {
      this.remove();
      this.render();
      this.profileView.showInfo('Профиль успешно обновлен!');
    });
    eventBus.addEventListener(ProfileEvents.userDataUpdateFailed, (errorText) => {
      this.profileView.showError(errorText);
    })
  }

  dataChange(name, phone, mail, password, repeatPassword,  avatar) {
    const currentUserData = store.getState().userState;
    let validation = {};
    if (currentUserData.name !== name) {
      validation = {
        ...validation,
        cName: {
          key: Validation.validateName(name),
          value: name,
        },
      }
    }

    if (currentUserData.email !== mail) {
      validation = {
        ...validation,
        cMail: {
          key: Validation.validateEmail(mail),
          value: mail,
        },
      }
    }

    if (currentUserData.phone !== phone) {
      validation = {
        ...validation,
        cPhone: {
          key: Validation.validatePhoneNumber(phone),
          value: phone,
        },
      }
    }

    if (password !== '' || repeatPassword !== '') {
      validation = {
        ...validation,
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
            correctData[key] = value.value;
          }
        }
    });

    Object.entries(correctData).forEach(([key, value]) => {
      if (value === '') {
        delete correctData[key];
      }
    });

    Object.entries(incorrectData).forEach(([key, value]) => {
      if (value === '') {
        delete incorrectData[key];
      }
    });

    if (incorrectData['cRepeatPassword'] !== undefined && incorrectData['cRepeatPassword'] !== '') {
      delete correctData['cPassword'];
    }

    this.profileView.showErrors(incorrectData);
    this.profileView.showInfo('');
    this.profileView.showError('');
    if (Object.keys(incorrectData).length !== 0) {
      return;
    }

    const updateModel = {
      cName: ProfileModel.updateUserName,
      cPhone: ProfileModel.updateUserPhone,
      cMail: ProfileModel.updateUserEmail,
      cPassword: ProfileModel.updateUserPassword,
    };

    console.log(correctData);

    Object.entries(correctData).forEach(([key, value]) => {
        updateModel[key](value);
    });
  }

  /**
   * Rendering view
   */
  render() {
    if (store.getState().userState.status === userStatus.userUndefined) {
      eventBus.addEventListener(AuthStatus.userDataUpdate, this.show);
    } else if (store.getState().userState.status === userStatus.userAuth) {
      this.profileView.render();
    } else {
      this.routeTo('/');
    }
  }

  show = () => {
    eventBus.unsubscribe(AuthStatus.userDataUpdate, this.show);
    if (store.getState().userState.status === userStatus.userAuth) {
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
