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
    Object.entries(urls).forEach(([name, {url, regUrl}]) => {
      if (pageUrl === '/') {
        console.log('Here');
        pageUrl = 'home';
      }
      if (pageUrl.includes(name) || pageUrl.match(regUrl)) {
        if (this.currControllerName) {
          this.routes.get(this.currControllerName).remove();
        }
        if (this.routes.get(name)) {
          if (pageUrl.match(regUrl)) { // TODO: инкастыляция
            window.history.pushState({}, '', pageUrl);
            this.routes.get(name).render(pageUrl.match(regUrl)[1]);
          } else {
            window.history.pushState({}, '', url);
            console.log(this.routes.get(name));
            this.routes.get(name).render();
          }
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

      if (href) {
        this.open(href);
      }
    }
  }
}
