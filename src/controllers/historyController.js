<<<<<<< HEAD
// import eventBus from '../modules/eventBus';
// import {HomeEvents} from '../events/Home';
// import {HistoryView} from '../views/profileViews/historyView/historyView';
// import {AuthStatus} from '../events/Auth';
// import ProfileModel from '../models/Profile';
// import {ProfileEvents} from '../events/Profile';
//
// // /**
// //  * History page controller
// //  */
// // export class HistoryController {
// //   /**
// //    * Constructor for controller
// //    * @param {HTMLElement} parent parent html element
// //    * @param {Function} routeTo router function for routing
// //    */
// //   constructor({
// //     parent: parent = document.body,
// //     routeTo: routeTo = () => {},
// //   }) {
// //     this.routeTo = routeTo;
// //     this.parent = parent;
// //     this.historyView = new HistoryView({
// //       parent: parent,
// //       routeTo: this.routeTo,
// //       controller: this});
// //
// //     eventBus.addEventListener(ProfileEvents.userOrdersHistoryGetSuccess,
// //         this.historyView.render.bind(this.historyView));
// //     eventBus.addEventListener(AuthStatus.userLogout, this.routeTo);
// //   }
// //   /**
// //    * Rendering home page with restaurants and checking auth
// //    */
// //   render() {
// //     ProfileModel.getOrdersHistory();
// //   }
// //
// //   /**
// //    * Removing listeners from home page
// //    */
// //   remove() {
// //     this.historyView.remove();
// //   }
// // }
=======
import eventBus from '../modules/eventBus';
import {HomeEvents} from '../events/Home';
import {HistoryView} from '../views/profileViews/historyView/historyView';
import {AuthStatus} from '../events/Auth';
import ProfileModel from '../models/Profile';
import {ProfileEvents} from '../events/Profile';

/**
 * History page controller
 */
export class HistoryController {
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

    eventBus.addEventListener(ProfileEvents.userOrdersHistoryGetSuccess,
        this.historyView.render.bind(this.historyView));
    eventBus.addEventListener(AuthStatus.userLogout, this.routeTo);
  }
  /**
   * Rendering home page with restaurants and checking auth
   */
  render() {
    ProfileModel.getOrdersHistory();
  }

  /**
   * Removing listeners from home page
   */
  remove() {
    this.historyView.remove();
  }
}
>>>>>>> 1dc26e74801309508dc2f74ba3fc1da45cedbba5
