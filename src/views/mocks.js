

export function getRestaurantMock() {
  return {
    id: 1,
    name: 'МакДоналдс',
    cost: 300,
    minDeliveryTime: 20,
    maxDeliveryTime: 30,
    rating: 4.7,
    address: 'Россия, Москва, ул. Пушкина, дом 10к2, этаж 2',
    tags: [
      {
        tagName: '₽',
      },
      {
        tagName: 'ФастФуд',
      },
      {
        tagName: 'Американская еда',
      },
    ],
    menuNavs: getMenuNavsMock(),
  };
}

export function getDish() {
  return {
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
            dishRadioId: 1,
            dishRadioName: 'Кисло-сладкий соус',
          },
          {
            dishRadioId: 2,
            dishRadioName: 'Сырный соус',
          },
        ],
      },
      {
        dishRadioTitle: 'Выберите соус(2/2)',
        dishRadioRows: [
          {
            dishRadioId: 1,
            dishRadioName: 'Кисло-сладкий соус',
          },
          {
            dishRadioId: 2,
            dishRadioName: 'Сырный соус',
          },
        ],
      },
    ],
    dishCheckboxTitle: 'Хотите добавить котлетку?',
    dishCheckboxesRows: [
      {
        dishCheckBoxId: 1,
        dishCheckboxRowTitle: 'Котлетка',
        dishCheckboxRowCost: 30,
      },
      {
        dishCheckBoxId: 2,
        dishCheckboxRowTitle: 'Креветка',
        dishCheckboxRowCost: 50,
      },
    ],
  };
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const items = [
  {
    restId: 2,
    itemId: 2,
    itemTitle: 'Бургер',
    itemWeight: 180,
    itemCcal: 420,
    itemCost: 200,
    itemNum: 1,
  },
  {
    restId: 2,
    itemId: 2,
    itemTitle: 'Макнаггетс',
    itemWeight: 180,
    itemCcal: 420,
    itemCost: 100,
    itemNum: 2,
  },
  {
    restId: 2,
    itemId: 3,
    itemTitle: 'МакКомбо',
    itemWeight: 180,
    itemCcal: 720,
    itemCost: 301,
    itemNum: 3,
  },
];

export function getItemToCart() {
  return items[getRandomInt(items.length)];
}

function getDishesListMocks() {
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
        });
  }
  return dishesList;
}

function getMenuNavsMock() {
  const dishesList = getDishesListMocks();
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
  return menuNavs;
}
