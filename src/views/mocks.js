

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
    dishRadiosWeight: '180',
    dishDescription: 'Неподражаемые Чикен Макнаггетс – это сочное 100% белое куриное мясо в хрустящей панировке со специями. Только натуральная курочка без искусственных красителей и ароматизаторов и без консервантов',
    dishImg: 'https://calorizator.ru/sites/default/files/imagecache/product_512/product/chicken-mcnuggets.jpg',
    dishRadios: [
      {
        dishRadioTitle: 'Выберите соус(1/2)',
        dishRadioId: 1,
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
        dishRadioId: 2,
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
    id: '1',
    number: 1,
    dishTitle: 'ЧикенМакнаггетс',
    dishCost: '100',
    dishCcal: '420',
    dishWeight: '180',
    dishDescription: 'Неподражаемые Чикен Макнаггетс – это сочное 100% белое куриное мясо в хрустящей панировке со специями. Только натуральная курочка без искусственных красителей и ароматизаторов и без консервантов',
    dishImg: 'https://calorizator.ru/sites/default/files/imagecache/product_512/product/chicken-mcnuggets.jpg',
    dishRadios: [
      {
        dishRadioTitle: 'Выберите соус(1/2)',
        dishRadioId: 1,
        dishRadioChooseId: 1,
      },
      {
        dishRadioTitle: 'Выберите соус(2/2)',
        dishRadioId: 2,
        dishRadioChooseId: 1,
      },
    ],
    dishCheckboxTitle: 'Хотите добавить котлетку?',
    dishCheckboxes: [
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
