'use strict';
import {Router} from './modules/router.js';
import {LoginController} from './controllers/loginController.js';
import {HomeController} from './controllers/homeController.js';
import {SignUpController} from './controllers/signUpController.js';
import {ProfileController} from './controllers/profileController.js';
import {RestaurantController} from './controllers/restaurantController.js';
import {urls} from './modules/urls.js';

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

const router = new Router(document.body);
const routeTo = (url) => {
  router.open(url);
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then((registration) => {
        const data = {
          type: 'CACHE_URLS',
          payload: [
            location.href,
            ...performance.getEntriesByType('resource').map((r) => r.name)
          ]
        };
        registration.installing.postMessage(data);
      })
      .catch((err) => console.log('SW registration FAIL:', err));
}

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
const restaurantController = new RestaurantController({
  parent: application,
  routeTo: routeTo});

router.addRoute(urls.login.name, loginController);
router.addRoute(urls.profile.name, profileController);
router.addRoute(urls.home.name, homeController);
router.addRoute(urls.signup.name, signUpController);
router.addRoute('restaurant', restaurantController); // TODO: поправить инкастыляцию с именем

document.getElementById('foot').innerHTML = Handlebars.
    templates['footer.hbs']({});

router.start();
