/**
 * Class that render LoginPage
 */
export class LoginPage {
    /**
     * Construct LoginPage class
     * @param {HTMLElement} parent
     */
    constructor(parent) {
        this.parent = parent;
    }
    /**
     * method that render login page in inner HTML of element
     */
    render() {
        // eslint-disable-next-line no-undef
        const template = Handlebars.templates['loginPage.hbs'];
        this.parent.innerHTML = template({});
    }
}