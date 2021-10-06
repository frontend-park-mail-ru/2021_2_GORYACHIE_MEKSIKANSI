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
    this.linksPrevents = this.linksPrevents.bind(this);
    this.root.addEventListener('click', this.linksPrevents);
    window.addEventListener('popstate', () => {
      this.open(window.location.pathname);
    });
  }

  /**
   * Adding page to history API if back is false, replace it if back is true
   * @param {string} pageUrl
   * @param {boolean} back
   */
  historyPush(pageUrl, back) {
    if (!back) {
      window.history.pushState({}, '', pageUrl);
    }

    window.history.replaceState({}, '', pageUrl);
  }

  /**
   * Function for redirection to the url
   * @param {string} pageUrl
   */
  open(pageUrl) {
    Object.entries(urls).forEach(([name, {url}]) => {
      if (pageUrl === name || pageUrl === url) {
        if (this.currControllerName && this.routes.get(this.currControllerName).viewIsActive) {
          this.routes.get(this.currControllerName).remove();
        }
        if (this.routes.get(name)) {
          console.log(url);
          window.history.pushState({}, '', url);
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

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  start() {
    this.open(window.location.pathname);
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
