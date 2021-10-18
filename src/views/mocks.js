

export function getRestaurantMock() {
  return {
    id: 1,
    name: 'МакДоналдс',
    cost: 300,
    minDTime: 20,
    maxDTime: 30,
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
    checkboxes: [
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
    checkboxes: [
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

export function getItemToCart(dishId) {
  return items[0];
}

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
