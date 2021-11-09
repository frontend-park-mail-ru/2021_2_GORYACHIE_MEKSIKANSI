import restaurantsListTemplate from './restaurantsList.hbs';
import {List} from 'hme-design-system/src/components/list/list.js';
import {DishBlock} from "hme-design-system/src/components/dishBlock/dishBlock";
import {RestaurantBlock} from "hme-design-system/src/components/restaurantBlock/restaurantBlock";

export class RestaurantsList {
  constructor() {

  }

  render({
    parent: parent,
    restaurantsList: restaurantList,
  }) {
    this.parent = parent;
    const objList = [];
    restaurantList.forEach((item) => {
      objList.push(new RestaurantBlock(item).render());
    });
    this.parent.innerHTML = restaurantsListTemplate({restaurantList: new List({listTitle: 'Рестораны', objList: objList}).render()});
  }

  remove() {
    this.parent.innerHTML = '';
  }
}
