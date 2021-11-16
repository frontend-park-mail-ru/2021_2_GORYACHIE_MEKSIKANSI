export const icon = '<svg class="button-icon-v__icon sort-underheader__button-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="528" height="528" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">\n' +
  '<g>\n' +
  '\t<path fill="#68362B" d="M41,31.5c0,1.381-1.119,2.5-2.5,2.5h-29C8.119,34,7,32.881,7,31.5l0,0C7,30.119,8.119,29,9.5,29h29   C39.881,29,41,30.119,41,31.5L41,31.5z"/>\n' +
  '    <path fill="#68362B" d="M38.5,18c0,0-0.252-0.3-2-1c-2.5-1-23.5-1-25,0c-1.044,0.696-2,1-2,1C8.119,18,7,19.119,7,20.5   S8.119,23,9.5,23h29c1.381,0,2.5-1.119,2.5-2.5S39.881,18,38.5,18z"/>\n' +
  '</g>\n' +
  '                <g>\n' +
  '\t<path fill="#FFC107" d="M8,35v4.75C8,40.993,9.007,42,10.25,42h27.5c1.243,0,2.25-1.007,2.25-2.25V35H8z"/>\n' +
  '                    <path fill="#FFC107" d="M24,6C15.164,6,8,10.478,8,16h32C40,10.478,32.837,6,24,6z"/>\n' +
  '</g>\n' +
  '                <rect x="7" y="24" fill="#FF3D00" width="34" height="4"/>\n' +
  '                <g>\n' +
  '\t<circle fill="#CE8106" cx="16" cy="13" r="1"/>\n' +
  '                    <circle fill="#CE8106" cx="18" cy="10" r="1"/>\n' +
  '                    <circle fill="#CE8106" cx="20" cy="13" r="1"/>\n' +
  '</g>\n' +
  '                <g>\n' +
  '\t<path fill="#8BC34A" d="M41.911,35.403c-0.285-0.855-0.956-1.509-1.805-2.003C39.671,33.77,39.115,34,38.5,34h-29   c-0.646,0-1.229-0.252-1.673-0.654C7.25,33.922,6.8,34.57,6.625,35.155c-0.409,1.361-0.635,3.548,1.254,3.417   c0.888-0.062,1.724-0.396,2.426-0.906c1.094-0.794,1.548-1.021,2.366-0.008c0.795,0.984,1.428,1.834,2.438,0.647   c1.048-1.233,1.182-1.913,2.974-1.548c1.876,0.383,3.45,1.683,5.364,1.986c0.932,0.146,1.337,0.128,1.89-0.672   c0.451-0.652,0.862-2.06,1.734-2.193c1.422-0.217,0.349,1.371,0.308,2.09c-0.106,1.82,1.893,0.265,2.426-0.357   c0.333-0.389,0.825-1.193,1.431-1.039c0.66,0.17,0.322,0.52,0.466,1.063c0.134,0.506,0.586,1.372,1.197,1.364   c0.749-0.01,1.101-1.332,1.479-1.868c0.307-0.432,0.879-1.183,1.479-1.146c0.665,0.042,0.847,0.873,1.181,1.418   c0.686,1.119,2.586,2.152,3.811,1.258C41.633,38.088,42.232,36.365,41.911,35.403z"/>\n' +
  '                    <path fill="#8BC34A" d="M40.105,15.735H8.069c-0.958,0.406-1.687,0.917-1.862,1.5c-0.412,1.361-0.356,2.467,1.548,2.336   c0.894-0.062,1.736-0.396,2.444-0.906c1.103-0.794,1.56-1.021,2.385-0.008c0.801,0.984,1.439,1.834,2.456,0.647   c1.056-1.233,1.191-1.913,2.996-1.548c1.892,0.383,3.477,1.683,5.407,1.986c0.938,0.146,1.349,0.128,1.903-0.672   c0.455-0.652,0.869-2.06,1.749-2.193c1.433-0.217,0.352,1.371,0.31,2.09c-0.106,1.82,1.907,0.265,2.444-0.357   c0.336-0.389,0.832-1.193,1.442-1.039c0.665,0.17,0.325,0.52,0.47,1.063c0.135,0.506,0.591,1.372,1.206,1.364   c0.756-0.01,1.11-1.332,1.492-1.868c0.308-0.432,0.885-1.183,1.489-1.146c0.67,0.042,0.854,0.873,1.189,1.418   c0.691,1.119,2.607,2.152,3.841,1.258c0.791-0.573,0.8-0.963,0.475-1.925C41.21,17.007,40.722,16.334,40.105,15.735z"/>\n' +
  '</g>\n' +
  '                <g>\n' +
  '\t<path fill="#FFEB3B" d="M39,29c-15,0-21,3-21,3s-4-3-9-3v-1h30V29z"/>\n' +
  '                    <path fill="#FFEB3B" d="M9,24c15,0,21,3,21,3s4-3,9-3v-1H9V24z"/>\n' +
  '</g>\n' +
  '</svg>';

/**
 * Mocking restaurant
 * @return {object}
 */
export function getRestaurantMock() {
  return {
    id: 1,
    name: 'МакДоналдс',
    cost: 300,
    minDTime: 20,
    maxDTime: 30,
    dCost: 300,
    rate: 4.7,
    addrs: 'Россия, Москва, ул. Пушкина, дом 10к2, этаж 2',
    tags: [
      {
        name: '₽',
      },
      {
        name: 'ФастФуд',
      },
      {
        name: 'Американская еда',
      },
    ],
    menu: getMenuNavsMock(),
  };
}

/**
 * Mocking dish
 * @return {object}
 */
export function getDish() {
  return {
    id: '1',
    name: 'ЧикенМакнаггетс',
    cost: '100',
    ccal: '420ккал',
    weight: '180',
    desc: 'Неподражаемые Чикен Макнаггетс – это сочное 100% белое куриное мясо в хрустящей панировке со специями. Только натуральная курочка без искусственных красителей и ароматизаторов и без консервантов',
    img: 'https://calorizator.ru/sites/default/files/imagecache/product_512/product/chicken-mcnuggets.jpg',
    radios: [
      {
        name: 'Выберите соус(1/2)',
        rId: 1,
        opt: [
          {
            id: 1,
            name: 'Кисло-сладкий соус',
          },
          {
            id: 2,
            name: 'Сырный соус',
          },
        ],
      },
      {
        name: 'Выберите соус(2/2)',
        rId: 2,
        opt: [
          {
            id: 1,
            name: 'Кисло-сладкий соус',
          },
          {
            id: 2,
            name: 'Сырный соус',
          },
        ],
      },
    ],
    ingredients: [
      {
        id: 1,
        name: 'Котлетка',
        cost: 30,
      },
      {
        id: 2,
        name: 'Креветка',
        cost: 50,
      },
    ],
  };
}

/**
 * Mocking random int
 * @param {int} max
 * @return {int}
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const items = [
  {
    id: '1',
    num: 1,
    name: 'ЧикенМакнаггетс',
    cost: 100,
    ccal: '420',
    weight: '180',
    desc: 'Неподражаемые Чикен Макнаггетс – это сочное 100% белое куриное мясо в хрустящей панировке со специями. Только натуральная курочка без искусственных красителей и ароматизаторов и без консервантов',
    img: 'https://calorizator.ru/sites/default/files/imagecache/product_512/product/chicken-mcnuggets.jpg',
    radios: [
      {
        name: 'Выберите соус(1/2)',
        rId: 1,
        id: 1,
      },
      {
        dishRadioTitle: 'Выберите соус(2/2)',
        rId: 2,
        id: 1,
      },
    ],
    ingredients: [
      {
        id: 1,
        name: 'Котлетка',
        cost: 30,
      },
      {
        id: 2,
        name: 'Креветка',
        cost: 50,
      },
    ],
  },
];

/**
 * Mocking items to cart
 *  @param {Array} dishId
 *  @return {int}
 */
export function getItemToCart(dishId) {
  return items[0];
}

/**
 * Mocking dishes list
 * @return {object} dishesList
 */
function getDishesListMocks() {
  const dishesList = [];
  for (let i = 0; i < 10; i++) {
    dishesList.push(
        {
          id: '1',
          name: 'ЧикенМакнаггетс',
          cost: '100',
          ccal: '420ккал',
          desc: 'Неподражаемые Чикен Макнаггетс – это сочное 100% белое куриное мясо в хрустящей панировке со специями. Только натуральная курочка без искусственных красителей и ароматизаторов и без консервантов',
          img: 'https://calorizator.ru/sites/default/files/imagecache/product_512/product/chicken-mcnuggets.jpg',
        });
  }
  return dishesList;
}

/**
 * Mocking menu nav
 * @return {object}
 */
function getMenuNavsMock() {
  const dishesList = getDishesListMocks();
  const menuNavs = [
    {
      id: 'Menu1',
      name: 'Популярное',
      dishes: dishesList,
    },
    {
      id: 'Menu2',
      name: 'МакКомбо',
      dishes: dishesList,
    },
    {
      id: 'Menu3',
      name: 'Типа напитки',
      dishes: dishesList,
    },
  ];
  return menuNavs;
}

export const ordersHistoryBodyMock = [
  {
    name: 'МакДоналдс',
    historyOrder: true,
    date: '2 октября 2021, 14:07',
    img: 'https://calorizator.ru/sites/default/files/imagecache/product_512/product/chicken-mcnuggets.jpg',
    addrs: 'Россия, Москва, ул. Пушкина д. 14к2',
    items: [
      {
        name: 'МакНаггетс',
        count: 3,
        cost: 100,
      },
      {
        name: 'МакНаггетс',
        count: 1,
        cost: 100,
      },
      {
        name: 'МакНаггетс',
        count: 1,
        cost: 100,
      },
    ],
    dCost: 123,
    status: true,
    sumCost: 500,
  },
  {
    name: 'КФС',
    historyOrder: true,
    date: '2 октября 2021, 14:07',
    img: 'https://calorizator.ru/sites/default/files/imagecache/product_512/product/chicken-mcnuggets.jpg',
    addrs: 'Россия, Москва, ул. Пушкина д. 14к2',
    items: [
      {
        name: 'МакНаггетс',
        count: 1,
        cost: 100,
      },
      {
        name: 'МакНаггетс',
        count: 1,
        cost: 100,
      },
      {
        name: 'МакНаггетс',
        count: 1,
        cost: 100,
      },
    ],
    dCost: 400,
    status: false,
    sumCost: 500,
  },
];

export const reviewsBodyMock = {
  restaurant: {
    name: 'МакДоналдс',
    historyOrder: true,
    date: '2 октября 2021, 14:07',
    cost: 300,
    minDTime: 20,
    maxDTime: 30,
    dCost: 300,
    rating: 4.7,
    img: 'https://calorizator.ru/sites/default/files/imagecache/product_512/product/chicken-mcnuggets.jpg',
    tags: [
      {
        name: '₽',
      },
      {
        name: 'ФастФуд',
      },
      {
        name: 'Американская еда',
      },
    ],
    reviews: [
      {
        name: 'Сергей',
        text: 'Какой то текст отзыва',
        rate: '4',
        date: '16 ноября, 10:22'
      },
      {
        name: 'Сергей',
        text: 'Какой то текст отзыва',
        rate: '4',
        date: '16 ноября, 10:22'
      },
    ]
  }
}
