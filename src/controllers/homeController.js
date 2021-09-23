import {HomeView} from '../views/homeView/homeView.js';

const randomInteger = (min, max) => {
  // получить случайное число от (min-0.5) до (max+0.5)
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const makeid = () => {
  const restNames = ['Cheesecake Factory',
    'Shokolaat',
    'Gordon Biersch',
    'Crepevine',
    'Creamery',
    'Old Pro',
    'House of Bagels',
    'The Prolific Oven',
    'La Strada',
    'Buca di Beppo',
    'Madame Tam',
    'Sprout Cafe',
    'Junoon',
    'Bistro Maxine',
    'Three Seasons',
    'Reposado',
    'Siam Royal',
    'Krung Siam',
    'Thaiphoon',
    'Tamarine',
    'Joya',
    'Jing Jing',
    'Evvia Estiatorio',
    'Cafe 220',
    'Cafe Renaissance',
    'Kan Zeman',
    'Mango Caribbean Cafe',
    'Baklava',
    'Mandarin Gourmet',
    'Bangkok Cuisine',
    'Darbar Indian Cuisine',
    'Mantra',
    'Janta',
    'Hyderabad House',
    'Starbucks',
    'Coupa Cafe',
    'Lytton Coffee Company',
    'Il Fornaio',
    'Lavanda',
    'MacArthur Park',
    'Osteria',
    'Vero',
    'Cafe Renzo',
    'Miyake',
    'Sushi Tomo',
    'Kanpai',
    'Pizza My Heart',
    'New York Pizza',
    'California Pizza Kitchen',
    'Round Table',
    'Loving Hut',
    'Garden Fresh',
    'Cafe Epi',
    'Tai Pan'];
  return restNames[randomInteger(0, restNames.length - 1)];
};

const restaurantList =
  [
    {
      name: 'mac',
      imgUrl: 'https://st.depositphotos.com/2075661/2208/i/600/depositphotos_22080415-stock-photo-kfc-logo.jpg',
      cost: '299',
      minDeliveryTime: '12',
      maxDeliveryTime: '22',
      rating: '6.7',
    },
  ];

for (let i = 0; i < 100; ++i) {
  const random = {
    imgUrl: 'https://st.depositphotos.com/2075661/2208/i/600/depositphotos_22080415-stock-photo-kfc-logo.jpg',
    name: makeid(),
    cost: randomInteger(300, 500).toString(),
    minDeliveryTime: randomInteger(10, 15).toString(),
    maxDeliveryTime: randomInteger(30, 55).toString(),
    rating: randomInteger(1, 5).toString(),
  };

  restaurantList.push(random);
}

export class HomeController {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
  }) {
    this.routeTo = routeTo;
    this.parent = parent;
    this.homeView = new HomeView({parent: parent, routeTo: this.routeTo, controller: this});
  }

  render() {
    this.homeView.render({restaurantList: restaurantList});
  }

  remove() {
    this.homeView.remove();
  }
}
