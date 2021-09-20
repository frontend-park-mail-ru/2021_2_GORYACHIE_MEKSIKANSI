/**
 * Class that render SignUpPage
 */
export class SignUpPage {
  /**
     * Construct SignUpPage class
     * @param {HTMLElement} parent
     */
  constructor(parent) {
    this.parent = parent;
  }
  /**
     * method that render sign up page in inner HTML of element
     */
  render() {
    // eslint-disable-next-line no-undef
    const template = Handlebars.templates['signUpPage.hbs'];
    this.parent.innerHTML = template({});
  }
}
