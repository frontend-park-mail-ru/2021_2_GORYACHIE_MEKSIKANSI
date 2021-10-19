import {ResponseEvents} from '../events/Responses.js';
import store, {actions} from './store.js';
import eventBus from './eventBus.js';
import {AuthStatus} from '../events/Auth.js';

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
      ...response.body,
    });
  }
  return response;
}

export function logout() {
  store.dispatch({
    actionType: actions.storeUserLogout,
  });
  eventBus.emitEventListener(AuthStatus.userLogout, '/');
}
