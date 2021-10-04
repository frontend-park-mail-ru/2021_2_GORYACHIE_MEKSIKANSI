import {urls} from './urls.js';

/**
 * Router class
 */
export class Router {
  /**
   * Router constructor
   * @param {HTMLElement} root
   */
  constructor(root) {
    this.root = root;
    this.routes = new Map();
    this.currControllerName = urls.home.name;
    this.linksPrevents = this.linksPrevents.bind(this);
    this.root.addEventListener('click', this.linksPrevents);
  }

  /**
   * Function for redirection to the url
   * @param {string} pageUrl
   */
  open(pageUrl) {
    Object.entries(urls).forEach(([name, {url}]) => {
      if (pageUrl === name || pageUrl === url) {
        this.routes.get(this.currControllerName).remove();
        if (this.routes.get(name)) {
          this.routes.get(name).render();
          this.currControllerName = name;
        } else {
          this.open(urls.home.url);
        }
      }
    });
  }

  /**
   * Adding route to the map
   * @param {string} url
   * @param {Object} handler
   */
  addRoute(url, handler) {
    this.routes.set(url, handler);
  }

  /**
   * Action on listener
   * @param {Object} event
   */
  linksPrevents(event) {
    if (event.target.hasAttribute('href')) {
      event.preventDefault();
      const href = event.target.getAttribute('href');

      if (href) {
        this.open(href);
      }
    }
  }
}
