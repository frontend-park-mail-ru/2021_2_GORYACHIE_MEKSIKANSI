'use strict';
import {Router} from './modules/router.js';
import {LoginController} from './controllers/loginController.js';
import {HomeController} from './controllers/homeController.js';
import {SignUpController} from './controllers/signUpController.js';
import {ProfileController} from './controllers/profileController.js';
import {RestaurantView} from './views/restaurantView/restaurantView.js';
import {urls} from './modules/urls.js';
import {CartView} from './views/profileViews/cartView/cartView.js';

import User from './modules/user.js';
import {HistoryView} from './views/profileViews/historyView/historyView.js';

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
Handlebars.registerPartial('dish', Handlebars.templates['dish.hbs']);
Handlebars.registerPartial('order', Handlebars.templates['historyOrder.hbs']);

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

const restaurantView = new RestaurantView({
  parent: application,
  routeTo: routeTo,
});

const historyView = new HistoryView({
  parent: application,
  routeTo: routeTo,
});

const cartView = new CartView({
  parent: application,
  routeTo: routeTo,
});


document.getElementById('foot').innerHTML = Handlebars.templates['footer.hbs']({});
// restaurantView.render();
// homeController.homeView.render();
User.Auth = true;
User.email = 'email@example.ru';
// profileController.render();
// historyView.render();
cartView.render();

