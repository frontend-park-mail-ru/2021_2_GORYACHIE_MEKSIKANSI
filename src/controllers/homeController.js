import {HomeView} from '../views/homeView/homeView.js';
import eventBus from '../modules/eventBus.js';
import {HomeEvents} from '../events/Home.js';
import HomeModel from '../models/Home.js';

export class HomeController {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
  }) {
    eventBus.addEventListener(HomeEvents.homeGetRestaurantsSuccess, this.getRender.bind(this));
    eventBus.addEventListener(HomeEvents.homeGetRestaurantsFailed, this.incorrectRender.bind(this));
    eventBus.addEventListener(HomeEvents.homeUserLoggedIn, this.getRender.bind(this));
    this.routeTo = routeTo;
    this.parent = parent;
    this.homeView = new HomeView({parent: parent, routeTo: this.routeTo, controller: this});
  }

  getRender(restaurantList) {
    this.homeView.render({restaurantList: restaurantList});
  }

  render() {
    HomeModel.getRestaurants();
    HomeModel.check();
  }

  remove() {
    this.homeView.remove();
  }

  incorrectRender() {

  }
}
