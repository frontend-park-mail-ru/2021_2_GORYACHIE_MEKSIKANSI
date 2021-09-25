'use strict';
import {Router} from './modules/router.js';
import {LoginController} from './controllers/loginController.js';
import {HomeController} from './controllers/homeController.js';
import {SignUpController} from './controllers/signUpController.js';
import {ProfileController} from './controllers/profileController.js';
import User from './modules/user.js';

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

Handlebars.registerHelper('times', function(n, block) {
  let accum = '';
  for (let i = 0; i < n; ++i) {
    accum += block.fn(i);
  }
  return accum;
});

const application = document.getElementById('app');
const footer = document.getElementById('foot');
const footerTemplate = Handlebars.templates['footer.hbs'];
footer.innerHTML = footerTemplate({});

const router = new Router(application);
const routeTo = (url) => {
  router.open(url);
};


const loginController = new LoginController({parent: application, routeTo: routeTo});
const homeController = new HomeController({parent: application, routeTo: routeTo});
const signUpController = new SignUpController({parent: application, routeTo: routeTo});
const profileController = new ProfileController({parent: application, routeTo: routeTo});

router.addRoute('login', loginController);
router.addRoute('profile', profileController);
router.addRoute('home', homeController);
router.addRoute('signup', signUpController);

loginController.render();


