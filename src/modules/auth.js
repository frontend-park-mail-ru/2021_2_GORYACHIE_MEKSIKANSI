import {ResponseEvents} from 'Events/Responses.js';
import eventBus from './eventBus.js';
import {AuthStatus} from 'Events/Auth.js';
import {urls} from "./urls";
import {userActions} from "./reducers/userStore";
import userStore from "./reducers/userStore";

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
