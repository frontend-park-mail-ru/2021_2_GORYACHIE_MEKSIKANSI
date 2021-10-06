'use strict';
import {Router} from './modules/router.js';
import {LoginController} from './controllers/loginController.js';
import {HomeController} from './controllers/homeController.js';
import {SignUpController} from './controllers/signUpController.js';
import {ProfileController} from './controllers/profileController.js';
import {urls} from './modules/urls.js';

Handlebars.registerPartial('header', Handlebars.templates['header.hbs']);
Handlebars.registerPartial('restaurant',
    Handlebars.templates['restaurantBlock.hbs']);
Handlebars.registerPartial('promoBlock',
    Handlebars.templates['promoBlock.hbs']);
Handlebars.registerPartial('sortUnderheader',
    Handlebars.templates['sortUnderheader.hbs']);
Handlebars.registerPartial('sortBox', Handlebars.templates['sortBox.hbs']);
Handlebars.registerPartial('loginUserInput',
    Handlebars.templates['userLoginForm.hbs']);
Handlebars.registerPartial('signUpUserInput',
    Handlebars.templates['userSignUpForm.hbs']);

const application = document.getElementById('app');

const router = new Router(application);
const routeTo = (url) => {
  router.open(url);
};

const loginController = new LoginController({
  parent: application,
  routeTo: routeTo});
const homeController = new HomeController({
  parent: application,
  routeTo: routeTo});
const signUpController = new SignUpController({
  parent: application,
  routeTo: routeTo});
const profileController = new ProfileController({
  parent: application,
  routeTo: routeTo});

router.addRoute(urls.login.name, loginController);
router.addRoute(urls.profile.name, profileController);
router.addRoute(urls.home.name, homeController);
router.addRoute(urls.signup.name, signUpController);

document.getElementById('foot').innerHTML = Handlebars.
    templates['footer.hbs']({});

router.start();
