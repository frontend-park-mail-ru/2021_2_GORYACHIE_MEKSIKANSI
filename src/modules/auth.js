import {ResponseEvents} from 'Events/Responses.js';
import store, {actions, userStatus} from './store.js';
import eventBus from './eventBus.js';
import {AuthStatus} from 'Events/Auth.js';
import {urls} from "./urls";

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
  eventBus.emitEventListener(AuthStatus.userLogout, urls.home.url);
}
