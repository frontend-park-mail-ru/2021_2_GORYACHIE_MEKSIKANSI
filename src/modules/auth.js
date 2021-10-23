import {ResponseEvents} from 'Events/Responses.js';
import store, {actions, userStatus} from './store.js';
import eventBus from './eventBus.js';
import {AuthStatus} from 'Events/Auth.js';

/**
 * emitting events for user auth
 * @param {{status: int, body: json}} response
 * @return {Object} response
 *
 */
export function auth(response) {
  if (response.status === ResponseEvents.OK) {
    store.dispatch({
      actionType: actions.storeUserLogin,
      ...response.body.user,
    });
    store.dispatch({
      actionType: actions.storeUserDataUpdate,
      updated: {
        status: userStatus.userAuth,
      },
    });
  } else {
    store.dispatch({
      actionType: actions.storeUserDataUpdate,
      updated: {
        status: userStatus.userUnAuth,
      },
    });
  }
  eventBus.emitEventListener(AuthStatus.userDataGot, {});
  return response;
}

export function logout() {
  store.dispatch({
    actionType: actions.storeUserLogout,
  });
  eventBus.emitEventListener(AuthStatus.userLogout, '/');
}
