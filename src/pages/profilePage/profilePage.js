/**
 * Class that render ProfilePage
 */
export class ProfilePage {
  /**
   * Construct ProfilePage class
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    this.parent = parent;
  }
  /**
   * method that render profile page in inner HTML of element
   */
  render() {
    const template = Handlebars.templates['profilePage1.hbs'];
    this.parent.innerHTML = template({});
  }
}
