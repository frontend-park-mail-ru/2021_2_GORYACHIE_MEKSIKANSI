import {HomeView} from 'Views/homeView/homeView.js';
import eventBus from 'Modules/eventBus.js';
import {HomeEvents} from 'Events/Home.js';
import HomeModel from 'Models/Home.js';
import {AuthStatus} from 'Events/Auth.js';

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
    eventBus.addEventListener(AuthStatus.userLogout, this.routeTo);
  }
  /**
   * Rendering home page with restaurants and checking auth
   */
  render() {
    HomeModel.getRestaurants();
  }

  /**
   * Removing listeners from home page
   */
  remove() {
    this.homeView.remove();
  }
}
