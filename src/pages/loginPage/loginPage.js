/**
 * Class that render LoginPage
 */
import {LoginController} from "../../controllers/Login.js";
import {debugFunc} from "../../modules/debugMod.js";

export class LoginPage {
  /**
     * Construct LoginPage class
     *
     */
  constructor({
      root,
      routeTo,
      controller = new LoginController({root, routeTo}),
              } = {}) {
    this.root = root;
    this.routeTo = routeTo;
    this.controller = controller;
  }

 addSubmitEventListeners() {
    const login = document.getElementById('login');
    const password = document.getElementById('password');

    const form = document.getElementById('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const loginResult = this.controller.login('', login.value, password.value);

      if (loginResult.error) {
        debugFunc(loginResult.error, "login error, smth wrong");
      }
    })

 }

  /**
     * method that render login page in inner HTML of element
     */
  render() {
    const template = Handlebars.templates['loginPage.hbs'];
    this.root.innerHTML = template({});
    this.addSubmitEventListeners();
  }
}

