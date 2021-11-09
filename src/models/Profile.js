import eventBus from 'Modules/eventBus.js';
import {ProfileEvents} from 'Events/Profile.js';
import {profileGet, updateEmail, updateName, updatePassword, updatePhone} from 'Modules/api.js';
import {ResponseEvents} from 'Events/Responses.js';
import {urls} from 'Modules/urls.js';
import {userActions} from 'Modules/reducers/userStore.js';
import userStore from 'Modules/reducers/userStore.js';
import {updateAvatar} from "../modules/api";
import {SnackBar} from "../components/snackBar/snackBar";

/**
 * Class Profile Model
 */
class ProfileModel {
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

  updateUserAvatar(avatar) {
    updateAvatar(avatar)
        .then((response) => {
          const snack = new SnackBar({
            message: "Картинка обновлена!",
            status: "warn",
            position: "tr",
            width: "500px",
            fixed: true,
          });
          snack.settingUp();
          snack.Open();
          userStore.dispatch({
            actionType: userActions.storeUserDataUpdate,
            updated: {
              avatar: 'https://img.hmeats.fra1.cdn.digitaloceanspaces.com' + response.body.img,
            },
          });
          eventBus.emitEventListener(ProfileEvents.userDataUpdateSuccess, {});
        })
        .catch(() => {
          const snack = new SnackBar({
            message: "Произошла какая то ошибка!",
            status: "red",
            position: "tr",
            width: "500px",
            fixed: true,
          });
          snack.settingUp();
          snack.Open();
        });
  }
}

export default new ProfileModel();
