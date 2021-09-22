import { AuthStatus } from "../events/Auth.js";
import eventBus from "./eventBus.js";
import {debugFunc} from "./debugMod.js";

/**
 * emitting events for user auth
 *
 * @param {{status: int, parsedJSON: json}} response
 * @returns null
 *
 */
export function auth(response) {
    if (response.status === 401) {
        eventBus.emitEventListener(AuthStatus.notAuth, {});
        debugFunc('user is not logged in', response.status)
        return response
    }

    if (response.status === 200) {
        eventBus.emitEventListener(AuthStatus.userLogin, response.parsedJSON);
        debugFunc('user is not logged in', response.status)
        return response
    }
}