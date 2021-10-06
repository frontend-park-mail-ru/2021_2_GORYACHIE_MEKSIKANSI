import User from '../../modules/user.js';
import {Navbar} from '../../components/navbar/navbar.js';
import {View} from '../baseView/View.js';

const dishesList = [];
for (let i = 0; i < 10; i++) {
  dishesList.push(
    {
      id: '1',
      dishTitle: 'ЧикенМакнаггетс',
      dishCost: '100₽',
      dishCcal: '420ккал',
      dishImg: 'https://calorizator.ru/sites/default/files/imagecache/product_512/product/chicken-mcnuggets.jpg',
    });
}

const menuNavs = [
  {
    menuId: 'Menu1',
    menuTitle: 'Популярное',
    dishes: dishesList,
  },
  {
    menuId: 'Menu2',
    menuTitle: 'МакКомбо',
    dishes: dishesList,
  },
  {
    menuId: 'Menu3',
    menuTitle: 'Типа напитки',
    dishes: dishesList,
  },
];




export class RestaurantView extends View {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller,
  }) {
    super({
      parent: parent,
      routeTo: routeTo,
      controller: controller,
    });
    this.navbar = new Navbar(parent);
  }

  render(props = {}) {
    this.navbar.render();
    const template = Handlebars.templates['page.hbs'];
    this.parent.innerHTML += template({
      auth: User.Auth,
      head: Handlebars.templates['header.hbs']({auth: User.Auth}) + Handlebars.templates['restaurantHeader.hbs']({
        name: 'МакДоналдс',
        cost: 300,
        minDeliveryTime: 20,
        maxDeliveryTime: 30,
        rating: 4.7,
      }),
      content: Handlebars.templates['restaurantUnderheader.hbs']({
        menuNavs: menuNavs,
      }) + Handlebars.templates['restaurantPage.hbs']({menuBlock: menuNavs}),
    });

    this.settingUp();
  }

  settingUp() {
    const anchors = document.querySelectorAll('a[href*="#"]');
    this.menuNavsTitles = document.querySelectorAll('.restaurant-page__menu-title');
    this.menuNavsButtons = document.querySelectorAll('.restaurant-nav__btn');


    for (const anchor of anchors) {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();

        const blockID = anchor.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }

    window.addEventListener('scroll', this.stickNavbar);
    window.addEventListener('scroll', this.navHighlight);

    this.menuNavbar = document.querySelector('.restaurant-nav__list');
    this.sticky = this.menuNavbar.offsetTop;
  }

  stickNavbar = () => {
    if (window.pageYOffset >= this.sticky) {
      this.menuNavbar.classList.add('sticky');
      this.menuNavbar.style.left = '0';
      this.menuNavbar.style.borderBottom = 'solid 1px #e2e2e2';
      this.menuNavbar.style.paddingLeft = '3%';
    } else {
      this.menuNavbar.classList.remove('sticky');
      this.menuNavbar.style.borderBottom = '';
      this.menuNavbar.style.paddingLeft = '0';
    }
  };

  navHighlight = () => {
    for (let i = 0; i < this.menuNavsTitles.length - 1; i++) {
      if (window.pageYOffset >= this.menuNavsTitles[i].offsetTop &&
          window.pageYOffset < this.menuNavsTitles[i + 1].offsetTop ) {
        this.menuNavsButtons[i].style.borderBottom = 'solid 1px black';
      } else {
        this.menuNavsButtons[i].style.borderBottom = '';
      }
    }

    if (window.pageYOffset >= this.menuNavsTitles[this.menuNavsTitles.length - 1].offsetTop) {
      this.menuNavsButtons[this.menuNavsTitles.length - 1].style.borderBottom = 'solid 1px black';
    } else {
      this.menuNavsButtons[this.menuNavsTitles.length - 1].style.borderBottom = '';
    }
  }

  remove() {
    window.removeEventListener('scroll', this.stickNavbar);
    window.removeEventListener('scroll', this.navHighlight);
    this.navbar.remove();
    this.parent.innerHTML = '';
  }

}

