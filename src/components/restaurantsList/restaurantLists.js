import restaurantsListTemplate from './restaurantsList.hbs';
import {List} from 'hme-design-system/src/components/list/list.js';
import {DishBlock} from 'hme-design-system/src/components/dishBlock/dishBlock';
import {RestaurantBlock} from 'hme-design-system/src/components/restaurantBlock/restaurantBlock';
import {SortBox} from 'hme-design-system/src/components/sortBox/sortBox';
import {SortHeader} from 'hme-design-system/src/components/sortHeader/sortHeader';
import {ButtonIconV} from 'hme-design-system/src/components/button/button';
import {icon} from '../../views/mocks';

export class RestaurantsList {
  constructor() {

  }

  render({
    parent: parent,
    restaurantsList: restaurantList,
  }) {
    this.parent = parent;
    const objList = [];
    if (restaurantList) {
      restaurantList.forEach((item) => {
        objList.push(new RestaurantBlock(item).render());
      });
    }
    this.parent.innerHTML = restaurantsListTemplate({
      sortBox: new SortBox().render(),
      sortHeader: new SortHeader({
        buttons: [
          new ButtonIconV({
            label: 'Фастфуд',
            icon: icon,
          }).render(),
          new ButtonIconV({
            label: 'Суши',
            icon: icon,
          }).render(),
          new ButtonIconV({
            label: 'Креветки',
            icon: icon,
          }).render(),
          new ButtonIconV({
            label: 'Шаурма',
            icon: icon,
          }).render(),
        ],
      }).render(),
      restaurantList: new List({listTitle: 'Рестораны', objList: objList}).render()});
  }

  remove() {
    this.parent.innerHTML = '';
  }
}
