import {ResponseEvents} from 'Events/Responses.js';
import eventBus from './eventBus.js';
import {AuthStatus} from 'Events/Auth.js';
import {urls} from './urls';
import {userActions} from './reducers/userStore';
import userStore from './reducers/userStore';
import cartStore, {clearCart} from './reducers/cartStore';
import {cartActions, updateStorage, setCart} from './reducers/cartStore';
import {cartGet, getWSKey, updateCartPut} from './api.js';
import Profile from 'Models/Profile';
import Socket from 'Modules/webSocket';

/**
 * emitting events for user auth
 * @param {{status: int, body: json}} response
 * @return {Object} response
 *
 */
export function auth(response) {
  if (response.status === ResponseEvents.OK) {
    userStore.dispatch({
      actionType: userActions.storeUserLogin,
      ...response.body.user,
    });

    Profile.getCart();
    getWSKey()
        .then((responseKey) => {
          if (responseKey.status === ResponseEvents.OK) {
            Socket.connect(responseKey.body.web_socket.key);
          }
        });

  } else {
    eventBus.emitEventListener(AuthStatus.notAuth, {});
  }

  return response;
}

/**
 * emitting events for user logout
 */
export function logout() {
  userStore.dispatch({
    actionType: userActions.storeUserLogout,
  });
  cartStore.dispatch({
    actionType: cartActions.update,
    state: {
      restaurant: {
        id: -1,
        name: '',
      },
      cart: [],
    },
  });
  Socket.disconnect();
  eventBus.emitEventListener(AuthStatus.userLogout, urls.home);
}
