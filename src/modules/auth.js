import {AuthStatus} from '../events/Auth.js';
import eventBus from './eventBus.js';
import {ResponseEvents} from '../events/Responses.js';

/**
 * emitting events for user auth
 * @param {{status: int, parsedJSON: json}} response
 * @return {Object} response
 *
 */
export function auth(response) {
  if (response.status === ResponseEvents.OK) {
    eventBus.emitEventListener(AuthStatus.userLogin, response.parsedJSON);
  }
  // return response;
}
