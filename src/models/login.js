import { loginPost } from "../modules/api.js";
import eventBus from "../modules/eventBus.js"

class loginModels {
    login(email = '', phone = '', password) {
        loginPost({email, phone, password})
    }
}