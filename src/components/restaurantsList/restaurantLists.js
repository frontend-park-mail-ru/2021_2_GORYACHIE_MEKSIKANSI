import restaurantsList from './restaurantsList.hbs';


export class RestaurantsList {
  constructor() {

  }

  render({
    parent: parent,
    restaurantsList: restaurantList,
  }) {
    this.parent = parent;
    this.parent.innerHTML = restaurantsList({restaurantList: restaurantList});
  }

  remove() {
    this.parent.innerHTML = '';
  }
}
