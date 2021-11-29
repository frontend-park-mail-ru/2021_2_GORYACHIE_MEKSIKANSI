import eventBus from 'Modules/eventBus.js';
import {ProfileEvents} from 'Events/Profile.js';
import {profileGet, updateEmail, updateName, updatePassword, updatePhone} from 'Modules/api.js';
import {ResponseEvents} from '../events/Responses';
import {urls} from 'Modules/urls.js';
import {userActions} from 'Modules/reducers/userStore.js';
import userStore from '../modules/reducers/userStore';
import {cartGet, createOrder, getOrderInfo, orderHistoryGet, postPay, postReview, updateAvatar} from '../modules/api';
import {CreateSnack} from '../components/snackBar/snackBar';
import {orderBodyMock, ordersHistoryBodyMock} from '../views/mocks';
import {cloudPrefix} from '../modules/consts';
import cartStore, {cartActions, setCart} from '../modules/reducers/cartStore';
import {AuthStatus} from '../events/Auth';
import {OrderingEvents} from '../events/Ordering';

/**
 * Class Profile Model
 */
class ProfileModel {
  /**
   * Use api to get cart
   */
  getCart() {
    cartGet()
        .then((cartResponse) => {
          if (cartResponse.status === ResponseEvents.OK) {
            setCart(cartResponse.body.cart);
          } else if (cartResponse.status === ResponseEvents.NotFound) {
            cartStore.dispatch({
              actionType: cartActions.update,
              state: {
                restaurant: {
                  id: -1,
                  name: '',
                },
                cart: [],
              },
            },
            );
          }
        })
        .then(() => {
          if (userStore.getState().auth) {
            eventBus.emitEventListener(AuthStatus.userLogin, {});
          }
        })
        .catch(() => {
        // TODO: user login but without cart
        });
  }
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
          } else {
            CreateSnack({
              title: 'Произошла какая-то ошибка!',
              status: 'red',
            });
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
            eventBus.emitEventListener(ProfileEvents.userOrderHistoryGetSuccess, response.body);
          } else {
            CreateSnack({
              title: 'Не получилось получить историю заказов.',
              status: 'red',
            });
            eventBus.emitEventListener(ProfileEvents.userOrderHistoryGetFailed, response.body);
          }
        });
    // .catch(() => {
    //   CreateSnack({
    //     title: 'Не получилось получить историю заказов.',
    //     status: 'red',
    //   });
    // });
  }

  /**
   * Post request by api to publish review
   * @param {number} restId
   * @param {string} value
   * @param {string} rate
   */
  publishReviewPost(restId, value, rate) {
    postReview({restId: restId, text: value, rate: rate})
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

  /**
   * Function of creating order
   * creating order by request on server
   * and emit signals of success or not
   * @param {string} methodPay
   * @param {string} comment
   * @param {string} flat
   * @param {string} porch
   * @param {string} floor
   * @param {string} intercom
   */
  createOrder({
    methodPay,
    comment,
    flat,
    porch,
    floor,
    intercom,
  }) {
    const order = {
      methodPay: methodPay,
      comment: comment,
      address: {
        coordinates: {
          latitude: userStore.getState().address.latitude,
          longitude: userStore.getState().address.longitude,
        },
        city: userStore.getState().city,
        street: userStore.getState().street,
        flat: flat,
        porch: porch,
        floor: floor,
        intercom: intercom,
      },
    };
    createOrder(order)
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            this.getCart();
            eventBus.emitEventListener(ProfileEvents.userOrderCreatedSuccess, response.body.order.id);
          } else {
          // Something went wrong
          }
        })
        .catch(() => {
          eventBus.emitEventListener(ProfileEvents.userOrderCreatedSuccess, {});
        });
  }

  /**
   * Outer function,
   * Request server with the pay and create order if pay is success
   * @param {string} methodPay
   * @param {string} comment
   * @param {string} flat
   * @param {string} porch
   * @param {string} floor
   * @param {string} intercom
   */
  createOrderWithPay({
    methodPay,
    comment,
    flat,
    porch,
    floor,
    intercom,
  }) {
    postPay()
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            this.createOrder({
              methodPay,
              comment,
              flat,
              porch,
              floor,
              intercom,
            });
          } else {
            CreateSnack({
              title: 'Ошибка оплаты!',
              status: 'red',
            });
          }
        })
        .catch(() => {
          CreateSnack({
            title: 'Сервер не отвечает!',
            status: 'red',
          });
        });
  }

  /**
   * Method for calling api and get information about order with status
   * @param {number | string} orderId
   */
  getOrder(orderId) {
    getOrderInfo(orderId)
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(ProfileEvents.userOrderGetSuccess, response.body);
          } else if (response.status === ResponseEvents.Forbidden) {
            eventBus.emitEventListener(ProfileEvents.userOrderGetFailed, {});
          } else {
            eventBus.emitEventListener(ProfileEvents.userOrderGetFailed, {});
          }
        })
        .catch(() => {
          // eventBus.emitEventListener(ProfileEvents.userOrderGetSuccess, orderBodyMock);
        });
  }
}

export default new ProfileModel();
