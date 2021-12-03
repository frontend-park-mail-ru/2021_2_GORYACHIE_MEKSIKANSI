import {View} from '@/views/baseView/View';
import Navbar from '@/components/navbar/navbar';
import baseProfilePage from '@/views/profileViews/baseProfilePage.hbs';
import profileButtonsNav from '@/components/profileButtonsNav/profileButtonsNav.hbs';
import {BaseProfileView} from '@/views/profileViews/baseProfileView';
import {DishBlock} from 'hme-design-system/src/components/dishBlock/dishBlock';
import {Order} from 'hme-design-system/src/components/contentBlock/order/order';
import {List} from 'hme-design-system/src/components/list/list';
import {RestaurantBlock} from 'hme-design-system/src/components/restaurantBlock/restaurantBlock';


/**
 * Profile view class
 */
export class FavouriteView extends BaseProfileView {
  /**
   *
   * @param {HTMLElement} parent
   * @param {Function} routeTo
   * @param {Class} controller
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller,
  }) {
    super({
      parent: parent,
      routeTo: routeTo,
      controller: controller,
    });
    this.navbar = Navbar;
  }

  /**
   * Method that render login page in inner HTML of element
   * @param {Object} props objects relating for rendering view
   */
  render(props = {}) {
    super.render();
    const restaurants = props.restaurants ? props.restaurants : [];

    this.navbar.render();
    this.parent.innerHTML += baseProfilePage({
      pageTitle: 'Избранное',
      content: new List({
        listTitle: '',
        objList: restaurants.map((restaurant) => {
          return new RestaurantBlock(restaurant).render();
        }),
      }).render(),
      rightMenu: profileButtonsNav});
  }
  /**
   * Method for setting up before rendering elements
   */
  settingUp() {
  }

  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    super.remove();
    this.navbar.remove();
    this.parent.innerHTML = '';
  }
}
