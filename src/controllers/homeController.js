import {HomeView} from '../views/homeView/homeView.js';
import eventBus from '../modules/eventBus.js';
import {HomeEvents} from '../events/Home.js';
import HomeModel from '../models/Home.js';
import {AuthStatus} from '../events/Auth.js';

/**
 * Home page controller
 */
export class HomeController {
  /**
   * Constructor for controller
   * @param {HTMLElement} parent parent html element
   * @param {Function} routeTo router function for routing
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
  }) {
    eventBus.addEventListener(HomeEvents.homeGetRestaurantsSuccess,
        this.getRender.bind(this));
    eventBus.addEventListener(AuthStatus.userLogout, this.rerender.bind(this));
    this.routeTo = routeTo;
    this.parent = parent;
    this.homeView = new HomeView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});
  }

  /**
   * Getting render from Home View
   * @param {Array} restaurantList array of restaurants to display
   */
  getRender(restaurantList) {
    this.homeView.render({restaurantList: restaurantList});
  }

  /**
   * Rendering home page
   */
  rerender() {
    this.routeTo('home');
  }

  /**
   * Rendering home page with restaurants and checking auth
   */
  render() {
    HomeModel.checkAuthAndGetRestaurants();
  }

  /**
   * Removing listeners from home page
   */
  remove() {
    this.homeView.remove();
  }
}
