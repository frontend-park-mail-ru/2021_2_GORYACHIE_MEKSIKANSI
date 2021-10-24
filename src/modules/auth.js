import {ResponseEvents} from 'Events/Responses.js';
import eventBus from './eventBus.js';
import {AuthStatus} from 'Events/Auth.js';
import {urls} from "./urls";
import {userActions} from "./reducers/userStore";
import userStore from "./reducers/userStore";
import cartStore, {clearCart} from "./reducers/cartStore";
import {cartActions, updateStorage, setCart} from "./reducers/cartStore";
import {cartGet, updateCartPut} from './api.js';

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

    if (cartStore.getState().cart.length > 0) {
      updateCartPut(cartStore.getState())  // TODO: чекнуть код ответа на удаление корзины
          .then((setCartResp) => {
            if (setCartResp.status === ResponseEvents.OK) {
              setCart(setCartResp.body);
            } else {
              cartStore.dispatch(clearCart());
            }
          });
    } else {
      cartGet()
          .then((cartResponse) => {
            if (cartResponse.status === ResponseEvents.OK) {
              setCart(cartResponse.body);
            }
          })
    }
    eventBus.emitEventListener(AuthStatus.userLogin, {});
  } else {
    eventBus.emitEventListener(AuthStatus.notAuth, {});
  }
  return response;
}

export function logout() {
  userStore.dispatch({
    actionType: userActions.storeUserLogout,
  });
  eventBus.emitEventListener(AuthStatus.userLogout, urls.home.url);
}
