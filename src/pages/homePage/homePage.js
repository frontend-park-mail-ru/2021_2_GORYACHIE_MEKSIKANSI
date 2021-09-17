/**
 * Class that render HomePage
 */
export class HomePage {
  /**
   * method that render home page in inner HTML of element
   * @param {HTMLElement} parent
   */
  render(parent) {
    // eslint-disable-next-line no-undef
    const template = Handlebars.templates['homePage.hbs'];
    // eslint-disable-next-line no-undef
    parent.innerHTML = template({restaurants: [1, 2, 3]});
    // parent.innerHTML =
  }
}
