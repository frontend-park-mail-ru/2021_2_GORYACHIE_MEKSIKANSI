import restaurantsListTemplate from './restaurantsList.hbs';
import {List} from 'hme-design-system/src/components/list/list.js';
import {DishBlock} from 'hme-design-system/src/components/dishBlock/dishBlock';
import {RestaurantBlock} from 'hme-design-system/src/components/restaurantBlock/restaurantBlock';
import {SortBox} from 'hme-design-system/src/components/sortBox/sortBox';
import {SortHeader} from 'hme-design-system/src/components/sortHeader/sortHeader';
import {ButtonIconV} from 'hme-design-system/src/components/button/button';
import {icon} from '../../views/mocks';

/**
 * Standard class to restaurant list
 */
export class RestaurantsList {
  /**
   * Constructor to restaurant list
   */
  constructor() {
  }

  /**
   * Rendering restaurant list on page
   * @param {HTMLElement} parent
   * @param {object} restaurantList
   */
  render({
    parent: parent,
    restaurantsList: restaurantList,
    title: title = '',
    addHeader: addHeader = true,
  }) {
    this.parent = parent;
    const objList = [];
    if (restaurantList) {
      restaurantList.forEach((item) => {
        objList.push(new RestaurantBlock(item).render());
      });
    }
    this.parent.insertAdjacentHTML('beforeend', restaurantsListTemplate({
      // sortBox: new SortBox().render(),
      // sortHeader: addHeader ? new SortHeader({
      //   buttons: [
      //     new ButtonIconV({
      //       label: 'Фастфуд',
      //       icon: icon,
      //     }).render(),
      //     new ButtonIconV({
      //       label: 'Суши',
      //       icon: icon,
      //     }).render(),
      //     new ButtonIconV({
      //       label: 'Креветки',
      //       icon: icon,
      //     }).render(),
      //     new ButtonIconV({
      //       label: 'Шаурма',
      //       icon: icon,
      //     }).render(),
      //   ],
      // }).render() : '',
      restaurantList: new List({listTitle: title, objList: objList}).render()}));
  }

  /**
   * Removing restaurant list from page
   */
  remove() {
    this.parent.innerHTML = '';
  }
}
