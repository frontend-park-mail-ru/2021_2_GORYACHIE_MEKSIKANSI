import {ResponseEvents} from '../events/Responses.js';
import store, {actions} from './store.js';
import eventBus from './eventBus.js';
import {AuthStatus} from '../events/Auth.js';

/**
 * emitting events for user auth
 * @param {{status: int, parsedJSON: json}} response
 * @return {Object} response
 *
 */
export function auth(response) {
  if (response.status === ResponseEvents.OK) {
    store.dispatch({
      actionType: actions.storeUserLogin,
      ...response.parsedJSON,
    });
    eventBus.emitEventListener(AuthStatus.userLogin, {});
  } else {
    eventBus.emitEventListener(AuthStatus.notAuth, {});
  }
  return response;
}

export function logout() {
  store.dispatch({
    actionType: actions.storeUserLogout,
  });
  eventBus.emitEventListener(AuthStatus.userLogout, '/');
}
