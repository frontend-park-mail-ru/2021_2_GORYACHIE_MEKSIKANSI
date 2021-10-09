import {HomeView} from '../views/homeView/homeView.js';
import eventBus from '../modules/eventBus.js';
import {HomeEvents} from '../events/Home.js';
import HomeModel from '../models/Home.js';
import {AuthStatus} from '../events/Auth.js';
import User from '../modules/user.js';

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
    this.routeTo = routeTo;
    this.parent = parent;
    this.homeView = new HomeView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});

    eventBus.addEventListener(HomeEvents.homeGetRestaurantsSuccess,
        this.homeView.render.bind(this.homeView));
    eventBus.addEventListener(AuthStatus.userLoggedOutHomeRerender, this.routeTo);
  }
  /**
   * Rendering home page with restaurants and checking auth
   */
  render() {
    if (!User.Auth) {
      HomeModel.checkAuthAndGetRestaurants();
      return;
    }
    HomeModel.getRestaurants();
  }

  /**
   * Removing listeners from home page
   */
  remove() {
    this.homeView.remove();
  }
}
