const urls = {
  home: {
    url: '/',
  },
  login: {
    url: '/login',
  },
  signup: {
    url: '/signUp',
  },
  profile: {
    url: '/profile',
  },
};


export class Router {
  constructor(root) {
    this.root = root;
    this.routes = new Map();
    this.currController = 'home';
    this.linksPrevents = this.linksPrevents.bind(this);
    this.root.addEventListener('click', this.linksPrevents);
  }

  open(pageUrl) {
    Object.entries(urls).forEach(([name, {url}]) => {
      if (pageUrl === name && pageUrl === 'logout') {
        this.open('/');
      }

      if (pageUrl === name || pageUrl === url) {
        if (this.routes.get(name)) {
          this.routes.get(this.currController).remove();
          this.routes.get(name).render();
          this.currController = name;
        } else {
          this.open('/');
        }
      }
    });
  }

  addRoute(url, handler) {
    this.routes.set(url, handler);
  }

  linksPrevents(event) {
    if (event.target) {
      event.preventDefault();
      const href = event.target.getAttribute('href');

      if (href) {
        this.open(href);
      }

      return;
    }
  }
}
