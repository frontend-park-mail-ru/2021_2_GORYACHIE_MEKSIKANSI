import eventBus from 'Modules/eventBus.js';
import {ProfileEvents} from 'Events/Profile.js';
import {profileGet, updateEmail, updateName, updatePassword, updatePhone} from 'Modules/api.js';
import {ResponseEvents} from '../events/Responses';
import {urls} from 'Modules/urls.js';
import {userActions} from 'Modules/reducers/userStore.js';
import userStore from 'Modules/reducers/userStore.js';
import {orderHistoryGet, updateAvatar} from '../modules/api';
import {SnackBar} from '../components/snackBar/snackBar';
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

  profileOrderHistoryGet() {
    orderHistoryGet()
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(ProfileEvents.userOrderHistoryGetSuccess, ordersHistoryBodyMock);
          } else {
            eventBus.emitEventListener(ProfileEvents.userOrderHistoryGetSuccess, ordersHistoryBodyMock)
          }
        })
        .catch(() => {
          eventBus.emitEventListener(ProfileEvents.userOrderHistoryGetSuccess, ordersHistoryBodyMock);
        });
  }

  /**
   * Post request by api to publish review
   * @param restId
   * @param value
   * @param rate
   */
  publishReviewPost(restId, value, rate) {
    console.log('MAKE API REQUEST', restId, value, rate);
  }
}

export default new ProfileModel();
