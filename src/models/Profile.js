import eventBus from 'Modules/eventBus.js';
import {ProfileEvents} from 'Events/Profile.js';
import {profileGet, updateEmail, updateName, updatePassword, updatePhone} from 'Modules/api.js';
import {ResponseEvents} from '../events/Responses';
import {urls} from 'Modules/urls.js';
import {userActions} from 'Modules/reducers/userStore.js';
import userStore from 'Modules/reducers/userStore.js';
import {orderHistoryGet, postReview, updateAvatar} from '../modules/api';
import {CreateSnack, SnackBar} from '../components/snackBar/snackBar';
import {ordersHistoryBodyMock} from '../views/mocks';
import {cloudPrefix} from '../modules/consts';

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
          if (response.status === ResponseEvents.OK) {
            CreateSnack({
              title: 'Картинка обновлена!',
              status: 'green',
            });
            userStore.dispatch({
              actionType: userActions.storeUserDataUpdate,
              updated: {
                avatar: cloudPrefix + response.body.img,
              },
            });
            eventBus.emitEventListener(ProfileEvents.userDataUpdateSuccess, {});
          }
        })
        .catch(() => {
          CreateSnack({
            title: 'Произошла какая-то ошибка!',
            status: 'red',
          });
        });
  }

  /**
   * get history order for user
   * emit events for orders get success of failed
   */
  profileOrderHistoryGet() {
    orderHistoryGet()
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(ProfileEvents.userOrderHistoryGetSuccess, ordersHistoryBodyMock);
          } else {
            eventBus.emitEventListener(ProfileEvents.userOrderHistoryGetSuccess, ordersHistoryBodyMock);
          }
        })
        .catch(() => {
          eventBus.emitEventListener(ProfileEvents.userOrderHistoryGetSuccess, ordersHistoryBodyMock);
        });
  }

  /**
   * Post request by api to publish review
   * @param {number} restId
   * @param {number} value
   * @param {number} rate
   */
  publishReviewPost(restId, value, rate) {
    postReview({restId, value, rate})
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(ProfileEvents.userReviewPublishSuccess, {});
            CreateSnack({
              title: 'Отзыв успешно опубликован',
              status: 'green',
            });
          }
        })
        .catch(() => {
          CreateSnack({
            title: 'Не удалось опубликовать отзыв',
            status: 'red',
          });
          eventBus.emitEventListener(ProfileEvents.userReviewPublishSuccess, {});
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
}

export default new ProfileModel();
