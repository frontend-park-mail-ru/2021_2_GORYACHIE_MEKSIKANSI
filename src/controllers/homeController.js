import {HomeView} from '../views/homeView/homeView.js';
import eventBus from '../modules/eventBus.js';
import {HomeEvents} from '../events/Home.js';
import HomeModel from '../models/Home.js';
import {AuthStatus} from "../events/Auth.js";

export class HomeController {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
  }) {
    eventBus.addEventListener(HomeEvents.homeGetRestaurantsSuccess, this.getRender.bind(this));
    eventBus.addEventListener(HomeEvents.homeGetRestaurantsFailed, this.incorrectRender.bind(this));
    eventBus.addEventListener(AuthStatus.userLogout, this.rerender.bind(this));
    this.routeTo = routeTo;
    this.parent = parent;
    this.homeView = new HomeView({parent: parent, routeTo: this.routeTo, controller: this});
  }

  getRender(restaurantList) {
    this.homeView.render({restaurantList: restaurantList});
  }

  rerender() {
    this.routeTo('home');
  }

  render() {
    HomeModel.checkAuthAndGetRestaurants();
  }

  remove() {
    this.homeView.remove();
  }

  incorrectRender() {

  }
}
