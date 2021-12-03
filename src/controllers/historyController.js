import eventBus from '@/modules/eventBus';
import {HistoryView} from '@/views/profileViews/historyView/historyView';
import {AuthStatus} from '@/events/Auth';
import ProfileModel from '@/models/Profile';
import {ProfileEvents} from '@/events/Profile';
import userStore from '@/modules/reducers/userStore';
import {urls} from '@/modules/urls';

/**
 * History page controller
 */
export class HistoryController {
  private readonly routeTo: Function;
  private parent: HTMLElement;
  private readonly historyView: HistoryView;
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
    this.historyView = new HistoryView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});

    eventBus.addEventListener(ProfileEvents.userOrderHistoryGetSuccess,
        this.historyView.render.bind(this.historyView));
  }
  /**
   * Rendering home page with restaurants and checking auth
   */
  render() {
    if (!userStore.getState().auth) {
      eventBus.addEventListener(AuthStatus.userLogin, ProfileModel.profileOrderHistoryGet);
      eventBus.addEventListener(AuthStatus.notAuth, this.redirect);
    } else {
      ProfileModel.profileOrderHistoryGet();
    }
  }

  /**
   * Rendirectiong to other page
   */
  redirect = () => {
    this.routeTo(urls.home);
  }

  /**
   * Removing listeners from home page
   */
  remove() {
    eventBus.unsubscribe(AuthStatus.notAuth, this.redirect);
    eventBus.unsubscribe(AuthStatus.userLogin, ProfileModel.profileOrderHistoryGet);
    this.historyView.remove();
  }
}
