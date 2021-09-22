import {LoginController} from "../controllers/Login.js";
import {LoginPage} from "../pages/loginPage/loginPage.js";

export class LoginView {
    constructor({
        root = document.body,
        routeTo = () => {},
        controller = new LoginController({root}),
                }) {
        this.routeTo = routeTo;
        this.root = root;
        this.controller = controller;
        this.loginPage = new LoginPage({root, routeTo, controller});
    }

    render() {
        this.root.innerHTML = '';
        this.loginPage.render();
    }
}