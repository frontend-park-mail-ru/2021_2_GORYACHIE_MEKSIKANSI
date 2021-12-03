import eventBus from '@/modules/eventBus';
import {HomeEvents} from '@/events/Home';
import {AuthStatus} from '@/events/Auth';
import HomeModel from '@/models/Home';
import {HomeView} from '@/views/homeView/homeView';

/**
 * Home page controller
 */
export class HomeController {
  private readonly routeTo: Function;
  private parent: HTMLElement;
  private readonly homeView: HomeView;
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
