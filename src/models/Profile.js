import eventBus from 'Modules/eventBus.js';
import {ProfileEvents} from 'Events/Profile.js';
import {profileGet, updateEmail, updateName, updatePassword, updatePhone} from 'Modules/api.js';
import {ResponseEvents} from 'Events/Responses.js';
import {urls} from 'Modules/urls.js';
import {userActions} from 'Modules/reducers/userStore.js';
import userStore from 'Modules/reducers/userStore.js';
import {getOrderHistory, updateAvatar} from '../modules/api';
import {SnackBar} from '../components/snackBar/snackBar';
import {response} from "express";
import {ordersHistoryBodyMock} from "../views/mocks";

/**
 * Class Profile Model
 */
class ProfileModel {
/**
 * Updating user name method
 * @param {string} name
 */
  updateUserName(name) {
    updateName(name)
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            userStore.dispatch({
              actionType: userActions.storeUserDataUpdate,
              updated: {
                name: name,
              },
            });
            eventBus.emitEventListener(ProfileEvents.userDataUpdateSuccess, {});
          } else {
            eventBus.emitEventListener(ProfileEvents.userDataUpdateFailed, 'Произошла ошибка, профиль не обновлен :c');
          }
        })
        .catch(() => {
          eventBus.emitEventListener(ProfileEvents.userDataUpdateFailed, 'Произошла ошибка, профиль не обновлен :c');
        });
  }

  /**
   * Updating user email method
   * @param {string} email
   */
  updateUserEmail(email) {
    updateEmail(email)
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            userStore.dispatch({
              actionType: userActions.storeUserDataUpdate,
              updated: {
                email: email,
              },
            });
            eventBus.emitEventListener(ProfileEvents.userDataUpdateSuccess, {});
          } else {
            eventBus.emitEventListener(ProfileEvents.userDataUpdateFailed, 'Произошла ошибка, профиль не обновлен :c');
          }
        })
        .catch(() => {
          eventBus.emitEventListener(ProfileEvents.userDataUpdateFailed, 'Произошла ошибка, профиль не обновлен :c');
        });
  }

  /**
   * Updating user phone method
   * @param {string} phone
   */
  updateUserPhone(phone) {
    updatePhone(phone)
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            userStore.dispatch({
              actionType: userActions.storeUserDataUpdate,
              updated: {
                phone: phone,
              },
            });
            eventBus.emitEventListener(ProfileEvents.userDataUpdateSuccess, {});
          } else {
            eventBus.emitEventListener(ProfileEvents.userDataUpdateFailed, 'Произошла ошибка, профиль не обновлен :c');
          }
        })
        .catch(() => {
          eventBus.emitEventListener(ProfileEvents.userDataUpdateFailed, 'Произошла ошибка, профиль не обновлен :c');
        });
  }

  /**
   * Updating user password method
   * @param {string} password
   */
  updateUserPassword(password) {
    updatePassword(password)
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(ProfileEvents.userDataUpdateSuccess, {});
          } else {
            eventBus.emitEventListener(ProfileEvents.userDataUpdateFailed, 'Произошла ошибка, профиль не обновлен :c');
          }
        })
        .catch(() => {
          eventBus.emitEventListener(ProfileEvents.userDataUpdateFailed, 'Произошла ошибка, профиль не обновлен :c');
        });
  }

  /**
   * Updating user avatar method
   * @param {formdata} avatar
   */
  updateUserAvatar(avatar) {
    updateAvatar(avatar)
        .then((response) => {
          const snack = new SnackBar({
            message: 'Картинка обновлена!',
            status: 'warn',
            position: 'tr',
            width: '500px',
            fixed: true,
          });
          snack.settingUp();
          snack.Open();
          userStore.dispatch({
            actionType: userActions.storeUserDataUpdate,
            updated: {
              avatar: 'https://hmeats-spaces.fra1.cdn.digitaloceanspaces.com' + response.body.img,
            },
          });
          eventBus.emitEventListener(ProfileEvents.userDataUpdateSuccess, {});
        })
        .catch(() => {
          const snack = new SnackBar({
            message: 'Произошла какая то ошибка!',
            status: 'red',
            position: 'tr',
            width: '500px',
            fixed: true,
          });
          snack.settingUp();
          snack.Open();
        });
  }

  /**
   * Use api method to get orders history
   * If successful get history, emit event
   * Else emit failed event
   */
  getOrdersHistory() {
    getOrderHistory()
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            // eventBus.emitEventListener(ProfileEvents.userOrdersHistoryGetSuccess, response.body);
            eventBus.emitEventListener(ProfileEvents.userOrdersHistoryGetSuccess, ordersHistoryBodyMock);
          } else {
            eventBus.emitEventListener(ProfileEvents.userOrdersHistoryGetFailed, {});
          }
        })
        .catch(() => {
          // eventBus.emitEventListener(ProfileEvents.userOrdersHistoryGetFailed, {});
          eventBus.emitEventListener(ProfileEvents.userOrdersHistoryGetSuccess, ordersHistoryBodyMock);
        });
  }
}

export default new ProfileModel();
