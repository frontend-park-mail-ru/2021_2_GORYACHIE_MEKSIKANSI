/**
 * Left navigation bar class
 */
export class Navbar {
  /**
   * @param {HTMLElement} parent
   */
  constructor(parent = document.body) {
    this.parent = parent;
    this.opened = false;
  }

  /**
   * method rendering Navbar to the parent
   */
  render() {
    const template = Handlebars.templates['navbar.hbs'];
    this.parent.innerHTML = template({});
  }

  /**
   * method opening overlay navbar
   */
  open() {
    window.document.body.style.overflowY = 'hidden';
    this.parent.getElementsByClassName('navbar')[0].style.display = 'flex';
    this.parent.getElementsByClassName('navbar')[0].style.zIndex = '100';
    this.parent.getElementsByClassName('navbar-wrapper')[0].style.display = 'block';
    this.parent.getElementsByClassName('navbar-wrapper')[0].style.zIndex = '100';
    this.opened = true;
  }

  /**
   * closing overlay
   */
  close() {
    window.document.body.style.overflowY = 'scroll';
    this.parent.getElementsByClassName('navbar')[0].style.display = 'none';
    this.parent.getElementsByClassName('navbar-wrapper')[0].style.display = 'none';
    this.opened = false;
  }
}
