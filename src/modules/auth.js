import { AuthStatus } from "../events/Auth.js";
import eventBus from "./eventBus.js";

export function auth(response) {
    if (response.status === 401) {
        eventBus.emitEventListener(AuthStatus.notAuth, {});
        console.log('user is not logged in', response.status)
    }

    if (response.status === 200) {
        eventBus.emitEventListener(AuthStatus.userLogin, response.parsedJSON);
        console.log('user is logged in', response.status, response.parsedJSON)
    }
}