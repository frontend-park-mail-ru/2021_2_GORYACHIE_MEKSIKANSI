import {RestaurantView} from '../views/restaurantView/restaurantView.js';
// import eventBus from '../modules/eventBus.js';
// import {ProfileEvents} from '../events/Profile.js';
// import User from '../modules/user.js';
// import ProfileModel from '../models/Profile.js';
// import {urls} from '../modules/urls.js';

export class RestaurantController {  // TODO: добавить джсдок
  /**
   * Constructor for controller
   * @param {HTMLElement} parent parent html element
   * @param {Function} routeTo router function for routing
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo,
  }) {
    this.routeTo = routeTo;
    this.parent = parent;
    this.restaurantView = new RestaurantView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});
  }

  /**
   * Rendering view
   */
  render() {
    this.restaurantView.render({});
  }

  /**
   * Removing view
   */
  remove() {
    this.restaurantView.remove();
  }
}
