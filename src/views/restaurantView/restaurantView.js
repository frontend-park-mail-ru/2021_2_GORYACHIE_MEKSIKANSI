import User from '../../modules/user.js';
import {Navbar} from '../../components/navbar/navbar.js';
import {View} from '../baseView/View.js';

const dishesList = [];
for (let i = 0; i < 10; i++) {
  dishesList.push(
    {
      id: '1',
      dishTitle: 'ЧикенМакнаггетс',
      dishCost: '100',
      dishCcal: '420ккал',
      dishDescription: 'Неподражаемые Чикен Макнаггетс – это сочное 100% белое куриное мясо в хрустящей панировке со специями. Только натуральная курочка без искусственных красителей и ароматизаторов и без консервантов',
      dishImg: 'https://calorizator.ru/sites/default/files/imagecache/product_512/product/chicken-mcnuggets.jpg',
      dishRadios: [
        {
          dishRadioTitle: 'Выберите соус(1/2)',
          dishRadioRows: [
            {
              dishRadioName: 'Кисло-сладкий соус',
            },
            {
              dishRadioName: 'Сырный соус',
            },
          ]
        },
        {
          dishRadioTitle: 'Выберите соус(2/2)',
          dishRadioRows: [
            {
              dishRadioName: 'Кисло-сладкий соус',
            },
            {
              dishRadioName: 'Сырный соус',
            },
          ]
        },
      ],
      dishCheckboxes: [
        {
          dishCheckboxTitle: 'Хотите добавить котлетку?',
          dishCheckboxesRows: [
            {
              dishCheckboxRowTitle: 'Котлетка',
              dishCheckboxRowCost: '30',
            },
            {
              dishCheckboxRowTitle: 'Креветка',
              dishCheckboxRowCost: '50',
            },
          ]
        }
      ]
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
    this.anchors = document.querySelectorAll('a[href*="#"]');
    this.menuNavsTitles = document.querySelectorAll('.restaurant-page__menu-title');
    this.menuNavsButtons = document.querySelectorAll('.restaurant-nav__btn');
    this.dishes = document.querySelectorAll('.dish');

    this.dishes.forEach((item) => {
      item.addEventListener('click', this.showPopUp);
    });

    for (const anchor of this.anchors) {
      anchor.addEventListener('click', this.scrollingToMenu);
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

  scrollingToMenu = (e) => {
    e.preventDefault();
    const blockID = e.target.closest('a').getAttribute('href').substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  showPopUp = () => {
    const div = document.createElement('div');
    div.classList.add('dish-pop-up');
    div.innerHTML = Handlebars.templates['dishPopUp.hbs'](dishesList[0]);
    document.body.appendChild(div);
    document.body.style.overflowY = 'hidden';
    document.body.querySelector('.dish-pop-it__close-button').addEventListener('click', this.removePopUp);

    document.body.querySelector('.plus').addEventListener('click', this.increaseNumber);
    document.body.querySelector('.minus').addEventListener('click', this.decreaseNumber);

    document.body.querySelectorAll('.container').forEach((item) => {
      item.addEventListener('click', this.checkboxSummaryCostChange);
    })

  }

  removePopUp = () => {
    document.body.removeChild(document.body.querySelector('.dish-pop-up'));
    document.body.style.overflowY = 'scroll';
  }

  increaseNumber = () => {
    const number = document.body.querySelector('.dish-pop-it__number');
    number.innerHTML = String(Number(number.innerHTML) + 1);
  }

  decreaseNumber = () => {
    const number = document.body.querySelector('.dish-pop-it__number');
    if (Number(number.innerHTML) > 0) {
      number.innerHTML = String(Number(number.innerHTML) - 1);
    }
  }

  checkboxSummaryCostChange = (e) => {
    const checkbox = e.target.closest('input');
    console.log(checkbox);
    if (!checkbox.hasAttribute('checked')) {
      e.target.closest('input').setAttribute('checked', 'false');
    } else {
        if (checkbox.getAttribute('checked') === 'true') {
          checkbox.setAttribute('checked', 'false');
        } else {
          checkbox.setAttribute('checked', 'true');
        }
    }

    if (checkbox.getAttribute('checked') === 'true') {
      this.increaseSummaryCost(Number(e.target.closest('.dish-pop-it__checkbox-cost').innerHTML));
    } else {
      console.log(checkbox.closest('.dish-pop-it__checkbox-cost'));
      this.decreaseSummaryCost(Number(checkbox.closest('.dish-pop-it__checkbox-cost').innerHTML));
    }
  }

  decreaseSummaryCost = (val) => {
    const summaryCost = document.body.querySelector('.dish-pop-it__summary-cost');
    summaryCost.innerHTML = String(Number(summaryCost) - val);
  }

  increaseSummaryCost = (val) => {
    const summaryCost = document.body.querySelector('.dish-pop-it__summary-cost');
    summaryCost.innerHTML = String(Number(summaryCost) + val);
  }

  remove() {
    window.removeEventListener('scroll', this.stickNavbar);
    window.removeEventListener('scroll', this.navHighlight);
    this.anchors.forEach((anchor) => {
      anchor.removeEventListener('click', this.scrollingToMenu);
    })
    this.navbar.remove();
    this.parent.innerHTML = '';
  }

}

