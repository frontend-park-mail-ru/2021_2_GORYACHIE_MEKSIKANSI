const restaurantList = { restaurantList:
  [
    {name: 'mac'},
    {name: 'kfc'},
  ]
}

/**
 * Class that render HomePage
 */
export class HomePage {
  /**
   * Construct HomePage class
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    this.parent = parent;
  }
  /**
   * method that render home page in inner HTML of element
   */
  render() {
    const template = Handlebars.templates['homePage.hbs'];

    // const template = Handlebars.templates['restaurantBlock.hbs'];
    this.parent.innerHTML = template(restaurantList);
  }
}
