'use strict';
import './main.scss';

import {Router} from '@/modules/router';
import {LoginController} from '@/controllers/loginController';
import {HomeController} from '@/controllers/homeController';
import {SignUpController} from '@/controllers/signUpController';
import {ProfileController} from '@/controllers/profileController';
import {RestaurantController} from '@/controllers/restaurantController';
import {OrderingController} from '@/controllers/orderingController';
import {RestaurantReviewsController} from '@/controllers/restaurantReviewsController';
import {SearchController} from '@/controllers/searchController';
import {FavouriteController} from '@/controllers/favouriteController';
import {HistoryController} from '@/controllers/historyController';
import {OrderProcessController} from '@/controllers/orderProcessController';

import {urls} from '@/modules/urls';

import {Footer} from 'hme-design-system/src/components/footer/footer';


const application = document.getElementById('app');
const router = new Router(document.body);
const routeTo = (url) => {
  router.open(url);
};

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.ts', { scope: './' })
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
router.addRoute(urls.restaurant, restaurantController); // TODO: поправить инкастыляцию с именем
router.addRoute(urls.checkout, orderingController);
router.addRoute(urls.order, orderProcessController);
router.addRoute(urls.history, historyOrderController);
router.addRoute(urls.search, searchController);
router.addRoute(urls.favourite, favouriteController);
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
