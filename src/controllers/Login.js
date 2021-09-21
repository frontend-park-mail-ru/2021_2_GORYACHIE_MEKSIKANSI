import LoginModel from "../models/Login.js"
import { Validation } from "../modules/validation.js"
import users from "../modules/user.js"
import eventBus from "../modules/eventBus.js";
import {LoginEvents} from "../events/Login.js";
import {debugFunc} from "../debugMod.js";

export class LoginController {
    constructor({
        location = document.body
        routeTo = noop
                }) {
        this.routeTo = routeTo;
        this.location = location;
    }
}