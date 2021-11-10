

export function getRestaurantMock() {
  return {
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