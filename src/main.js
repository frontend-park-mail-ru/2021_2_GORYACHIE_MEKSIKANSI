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
import {HistoryController} from './controllers/historyController';
import {RestaurantReviewsView} from './views/restaurantReviewsView/restaurantReviewsView';
import {RestaurantReviewsController} from './controllers/restaurantReviewsController';
import {SearchController} from './controllers/searchController';
import {FavouriteController} from './controllers/favouriteController';
import {profileGet} from "./modules/api";


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
const historyOrderController = new HistoryController({
  parent: application,
  routeTo: routeTo});
const restaurantReviewsController = new RestaurantReviewsController({
  parent: application,
  routeTo: routeTo});
const searchController = new SearchController({
  parent: application,
  routeTo: routeTo});

const favouriteController = new FavouriteController({
  parent: application,
  routeTo: routeTo});


router.addRoute(urls.login, loginController);
router.addRoute(urls.profile, profileController);
router.addRoute(urls.home, homeController);
router.addRoute(urls.signup, signUpController);
router.addRoute(urls.restaurantReviews, restaurantReviewsController);
router.addRoute(urls.restaurant, restaurantController); // TODO: ?????????????????? ???????????????????????? ?? ????????????
router.addRoute(urls.checkout, orderingController);
router.addRoute(urls.order, orderProcessController);
router.addRoute(urls.history, historyOrderController);
router.addRoute(urls.search, searchController);
router.addRoute(urls.favourite, favouriteController);
document.getElementById('foot').innerHTML = new Footer({
  nav: [
    {
      title: 'HMEats ?????? ????????????????????',
      href: '',
    },
    {
      title: 'HMEats ?????? ????????????????',
      href: '',
    },
    {
      title: '????????????',
      href: '',
    },
    {
      title: '????????????????',
      href: '',
    },
  ],
}).render();
router.start();

// Start of application
profileGet({});
