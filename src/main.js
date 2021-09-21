'use strict';
import {HomePage} from './pages/homePage/homePage.js';
import {SignUpPage} from './pages/signUpPage/signUpPage.js';
import {LoginPage} from './pages/loginPage/loginPage.js';
import {ProfilePage} from './pages/profilePage/profilePage.js';

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
const homePage = new HomePage(application);
const loginPage = new LoginPage(application);
const signUpPage = new SignUpPage(application);
const profilePage = new ProfilePage(application);

const homePageRender = () => {
  homePage.render();
};

const loginPageRender = () => {
  loginPage.render();
};

const signUpPageRender = () => {
  signUpPage.render();
};

const profilePageRender = () => {
  profilePage.render();
};

const config = {
  login: {
    open: loginPageRender,
  },
  signUp: {
    open: signUpPageRender,
  },
  home: {
    open: homePageRender,
  },
  profile: {
    open: profilePageRender,
  },
};


homePageRender();

application.addEventListener('click', (e) => {
  const {target} = e;

  if (target instanceof HTMLAnchorElement ||
      target instanceof HTMLButtonElement ||
      target instanceof HTMLImageElement) {
    e.preventDefault();
    console.log(config[target.getAttribute('href')]);
    config[target.getAttribute('href')].open();
  }
});
