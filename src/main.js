'use strict';
import {Router} from 'Modules/router.js';
import {LoginController} from 'Controllers/loginController.js';
import {HomeController} from 'Controllers/homeController.js';
import {SignUpController} from 'Controllers/signUpController.js';
import {ProfileController} from 'Controllers/profileController.js';
import {RestaurantController} from 'Controllers/restaurantController.js';
import {OrderingController} from 'Controllers/orderingController.js';
import {urls} from 'Modules/urls.js';
import './main.scss';
import {OrderProcessController} from './controllers/orderProcessController';
import {Footer} from 'hme-design-system/src/components/footer/footer';
import {HistoryController} from "./controllers/historyController";


const application = document.getElementById('app');
const router = new Router(document.body);
const routeTo = (url) => {
  router.open(url);
};

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js', { scope: './' })
//       .then((registration) => {
//         const data = {
//           type: 'CACHE_URLS',
//           payload: [
//             location.href,
//             ...performance.getEntriesByType('resource').map((r) => r.name)
//           ]
//         };
//         registration.installing.postMessage(data);
//       })
//       .catch((err) => {
//
//       });
// }

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
const orderingController = new OrderingController({
  parent: application,
  routeTo: routeTo});
const orderProcessController = new OrderProcessController({
  parent: application,
  routeTo: routeTo});
const historyController = new HistoryController({
  parent: application,
  routeTo: routeTo});


router.addRoute(urls.login.name, loginController);
router.addRoute(urls.profile.name, profileController);
router.addRoute(urls.home.name, homeController);
router.addRoute(urls.signup.name, signUpController);
router.addRoute('restaurant', restaurantController); // TODO: поправить инкастыляцию с именем
router.addRoute(urls.checkout.name, orderingController);
router.addRoute(urls.order.name, orderProcessController);
router.addRoute(urls.history.name, historyController);
document.getElementById('foot').innerHTML = new Footer({
  nav: [
    {
      title: 'HMEats для ресторанов',
      href: '',
    },
    {
      title: 'HMEats для курьеров',
      href: '',
    },
    {
      title: 'Помощь',
      href: '',
    },
    {
      title: 'Контакты',
      href: '',
    },
  ],
}).render();
router.start();

