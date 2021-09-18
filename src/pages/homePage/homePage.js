const makeid = (length) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

let randomInteger = (min, max) => {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const restaurantList = {restaurantList:
        [
            {
                name: 'mac',
                imgUrl: 'https://st.depositphotos.com/2075661/2208/i/600/depositphotos_22080415-stock-photo-kfc-logo.jpg',
                cost: '299',
                minDeliveryTime: '12',
                maxDeliveryTime: '22',
                rating: '6.7',
            }
        ]};

for (let i = 0; i < 100; ++i) {
    let random = {
        imgUrl: 'https://st.depositphotos.com/2075661/2208/i/600/depositphotos_22080415-stock-photo-kfc-logo.jpg',
        name: makeid(1121),
        cost: randomInteger(300, 500).toString(),
        minDeliveryTime: randomInteger(10, 15).toString(),
        maxDeliveryTime: randomInteger(30, 55).toString(),
        rating: randomInteger(1, 5).toString(),
    };

    restaurantList.restaurantList.push(random);
}

/**
 * Class that render HomePage
 */
export class HomePage {
  /**
   * Construct HomePage class
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    this.parent = parent;
  }
  /**
   * method that render home page in inner HTML of element
   */
  render() {
    // eslint-disable-next-line no-undef
    const template = Handlebars.templates['homePage.hbs'];

    // const template = Handlebars.templates['restaurantBlock.hbs'];
    this.parent.innerHTML = template(restaurantList);
  }
}
