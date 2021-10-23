import eventBus from 'Modules/eventBus.js';
import {ProfileEvents} from 'Events/Profile.js';
import {profileGet, updateEmail, updateName, updatePassword, updatePhone} from 'Modules/api.js';
import {ResponseEvents} from 'Events/Responses.js';
import {urls} from 'Modules/urls.js';
import store, {actions} from 'Modules/store.js';

/**
 * Class Profile Model
 */
class ProfileModel {
  updateUserName(name) {
    updateName(name)
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            store.dispatch({
              actionType: actions.storeUserDataUpdate,
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

  updateUserEmail(email) {
    updateEmail(email)
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            store.dispatch({
              actionType: actions.storeUserDataUpdate,
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

  updateUserPhone(phone) {
    updatePhone(phone)
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            store.dispatch({
              actionType: actions.storeUserDataUpdate,
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
}

export default new ProfileModel();
