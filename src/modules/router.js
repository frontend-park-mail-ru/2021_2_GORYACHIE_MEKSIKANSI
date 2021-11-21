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
    this.currController = undefined;
    this.routes = new Map();
    this.linksPrevents = this.linksPrevents.bind(this);
    this.root.addEventListener('click', this.linksPrevents);
    window.addEventListener('popstate', () => {
      this.open(window.location.pathname);
    });
  }

  /**
   * Function for redirection to the url
   * @param {string} pageUrl
   */
  open(pageUrl) {
    console.log('ROUTING', pageUrl);
    // drop technical urls -_-
    if (pageUrl.startsWith('#')) {
      return;
    }
    // delete last slash
    if (pageUrl.length !== 1 && pageUrl.endsWith('/')) {
      pageUrl = pageUrl.slice(0, -1);
    }

    if (!pageUrl.startsWith('/')) {
      pageUrl = '/' + pageUrl;
    }

    // find simple path
    let foundedPath = [...this.routes].find(([key]) => {
      return key === pageUrl;
    });

    // if file not found -> not simple path
    if (!foundedPath) {
      foundedPath = [...this.routes].find(([key]) => {
        if (key instanceof RegExp) {
          return pageUrl.match(key);
        }
        return false;
      });
    }

    // if dont find needed path -> go home
    if (!foundedPath) {
      open(urls.home);
    }

    if (this.currController) {
      this.currController.remove();
    }

    this.currController = foundedPath[1];
    if (window.location.pathname !== pageUrl) {
      window.history.pushState(null, null, pageUrl);
    }
    if (foundedPath[0] instanceof RegExp) {
      foundedPath[1].render(pageUrl.match(foundedPath[0])[1]);
    } else {
      foundedPath[1].render();
    }
  }

  /**
   * Adding route to the map
   * @param {RegExp | String} url
   * @param {Object} handler
   */
  addRoute(url, handler) {
    this.routes.set(url, handler);
  }

  /**
   * Starting router
   */
  start() {
    this.open(window.location.pathname);
  }

  /**
   * Action on listener
   * @param {Object} event
   */
  linksPrevents(event) {
    const {target} = event;
    const closest = target.closest('a');
    if (closest && closest.hasAttribute('href')) { // TODO: инкастыляция сделать отлов не только 'a', но и button с href/поменять button на a
      event.preventDefault();
      const href = closest.getAttribute('href');
      this.open(href);
    }
  }
}
