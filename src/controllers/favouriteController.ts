import eventBus from '@/modules/eventBus';
import {urls} from '@/modules/urls';
import userStore from '@/modules/reducers/userStore';
import {AuthStatus} from '@/events/Auth';
import ProfileModel from '@/models/Profile';
import {ProfileEvents} from '@/events/Profile';
import {FavouriteView} from '@/views/profileViews/favouriteView/favouriteView';

/**
 * Favourite page controller
 */
export class FavouriteController {
  private readonly routeTo: Function;
  private parent: HTMLElement;
  private readonly favouriteView: FavouriteView;
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
    this.favouriteView = new FavouriteView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});

    eventBus.addEventListener(ProfileEvents.userFavouriteRestaurantsGetSuccess,
        this.favouriteView.render.bind(this.favouriteView));
  }
  /**
   * Rendering home page with restaurants and checking auth
   */
  render() {
    if (!userStore.getState().auth) {
      eventBus.addEventListener(AuthStatus.userLogin, ProfileModel.getFavourite);
      eventBus.addEventListener(AuthStatus.notAuth, this.redirect);
    } else {
      ProfileModel.getFavourite();
    }
  }

  /**
   * Redirecting to other page
   */
  redirect = () => {
    this.routeTo(urls.home);
  }

  /**
   * Removing listeners from home page
   */
  remove() {
    eventBus.unsubscribe(AuthStatus.notAuth, this.redirect);
    eventBus.unsubscribe(AuthStatus.userLogin, ProfileModel.getFavourite);
    this.favouriteView.remove();
  }
}
