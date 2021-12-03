import eventBus from '@/modules/eventBus.js';
import {Validation} from '@/modules/validation.js';
import {urls} from '@/modules/urls';
import userStore from '@/modules/reducers/userStore';
import {fileMaxSize} from '@/modules/consts';
import {ProfileEvents} from '@/events/Profile.js';
import {AuthStatus} from '@/events/Auth.js';
import {ValidationLength} from '@/events/Validation.js';
import {CreateSnack} from '@/components/snackBar/snackBar';
import {ProfileView} from '@/views/profileViews/profileView/profileView.js';
import ProfileModel from '@/models/Profile.js';

/**
 *  Profile controller class
 */
export class ProfileController {
  private readonly routeTo: Function;
  private parent: HTMLElement;
  private readonly profileView: ProfileView;
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
      CreateSnack({
        title: 'Профиль успешно обновлен!',
        status: 'green',
      });
    });
    eventBus.addEventListener(ProfileEvents.userDataUpdateFailed, (errorText) => {
      CreateSnack({
        title: errorText,
        status: 'red',
      });
    });
  }

  /**
   * Method to check image size
   * @param {formdata} file
   */
  checkImage(file) {
    if (file.size > fileMaxSize) {
      CreateSnack({
        title: 'Картинка слишком большого размера! Допустимый размер 7 мб',
        status: 'red',
      });
    } else {
      const payload = new FormData();
      payload.append('avatar', file);
      ProfileModel.updateUserAvatar(payload);
    }
  }

  /**
   * Method to change user data
   * @param {string} name
   * @param {string} phone
   * @param {string} mail
   * @param {string} password
   * @param {string} repeatPassword
   *
   */
  dataChange(name, phone, mail, password, repeatPassword) {
    const currentUserData = userStore.getState();
    let validation = {};
    if (currentUserData.name !== name) {
      validation = {
        ...validation,
        cName: {
          key: Validation.validateName(name),
          value: name,
        },
      };
    }

    if (currentUserData.email !== mail) {
      validation = {
        ...validation,
        cMail: {
          key: Validation.validateEmail(mail),
          value: mail,
        },
      };
    }

    if (currentUserData.phone !== phone) {
      validation = {
        ...validation,
        cPhone: {
          key: Validation.validatePhoneNumber(phone),
          value: phone,
        },
      };
    }

    if (password !== '' || repeatPassword !== '') {
      validation = {
        ...validation,
        cPassword: {
          key: Validation.validatePassword(password),
          value: password,
        },
        cRepeatPassword: {
          key: Validation.validatePasswordRepeat(password,
              repeatPassword),
          value: repeatPassword,
        },
      };
    }

    const incorrectData = {
      cName: '',
      cPhone: '',
      cMail: '',
      cPassword: '',
      cRepeatPassword: '',
    };
    const correctData = {
      cName: '',
      cPhone: '',
      cMail: '',
      cPassword: '',
    };

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

    Object.entries(correctData).forEach(([key, value]) => {
      updateModel[key](value);
    });
  }

  /**
   * Rendering view
   */
  render() {
    if (!userStore.getState().auth) {
      eventBus.addEventListener(AuthStatus.userLogin, this.show);
      eventBus.addEventListener(AuthStatus.notAuth, this.redirect);
    } else {
      this.profileView.render();
    }
  }

  /**
   * Showing profileView
   */
  show = () => {
    this.profileView.render();
  }

  /**
   * Rendirectiong to other page
   */
  redirect = () => {
    this.routeTo(urls.home);
  }

  /**
   * Removing view
   */
  remove() {
    eventBus.unsubscribe(AuthStatus.userLogin, this.show);
    eventBus.unsubscribe(AuthStatus.notAuth, this.redirect);
    this.profileView.remove();
  }
}
