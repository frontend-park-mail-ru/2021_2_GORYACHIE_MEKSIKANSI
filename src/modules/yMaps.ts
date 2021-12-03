import ymaps from 'ymaps';
import {Clusterer, IGeoObject} from "yandex-maps";


export class YandexMap {
  private initPos: { latitude: number; longitude: number };
  private callback: any;
  private pos: any;
  private map: any;
  private circle: object;
  private position: Array<number>;
  private point: Placemark;
  private radius: number;

  /**
   * Map init constructor
   */
  constructor() {
    this.initPos = {
      latitude: 55.751574,
      longitude: 37.57385,
    };
  }

  /**
   * Setting standart point
   * @param {object} pos
   */
  customPoint(pos) {
    ymaps.ready(() => {
      this.movePosition(pos);
      this.setCenter([pos, 1]);
      this.callback(pos, true);
    });
  }

  /**
   * Rendering map
   * @param {{id: int, pos: object, isStatic: boolean}} params
   * @param {Function} callback
   */
  render({
    id,
    pos = this.initPos,
    isStatic = false,
  } = {}, callback = (address: any, isRenew: any) => {}) {
    ymaps.ready(this.start.bind(this, {id, pos, isStatic}, callback));
  }

  /**
   *
   * @param {{id: int, pos: object, isStatic: boolean}} params
   * @param {Function} callback
   * openBalloonOnClick: false,
   */
  start({
    id,
    pos,
    isStatic,
  } = {}, callback ?) {
    this.callback = callback;
    this.pos = pos;
    document.getElementById(id).innerHTML = '';
    this.map = new ymaps.Map(id, {
      center: this.refactorToArray(this.pos),
      zoom: 11,
      controls: [],
    });

    if (!isStatic) {
      this.addListeners();
    }
  }

  /**
   * Init listeners for map
   */
  addListeners() {
    this.map.events.add('click', (e) => {
      const coords = e.get('coords');
      this.movePosition(this.convertPosArrayToObject(coords));
      this.getAddress();
    });
  }

  /**
   * Getting address
   */
  getAddress() {
    ymaps.geocode(this.refactorToArray(this.pos))
        .then((res) => {
          this.catchCallback(res);
        });
  }

  /**
   * Catching callback
   * @param {geoObject} res
   * @param {boolean} isRenew
   */
  catchCallback(res, isRenew = true) {
    const text = this.getUserPositionAddress(res.geoObjects.get(0).properties);
    const address = {
      name: text,
      latitude: this.pos.latitude,
      longitude: this.pos.longitude,
    };
    this.callback(address, isRenew);
  }

  /**
   * Getting address from position
   * @param {geoObject} properties
   * @return {object}
   */
  getUserPositionAddress(properties) {
    const prop = properties.get('metaDataProperty').GeocoderMetaData.AddressDetails.Country;
    return prop.AddressLine;
  }

  /**
   * Setting center on map
   * @param {object} pos
   * @param {int} zoom
   */
  setCenter({pos, zoom}: Object) {
    this.map.setCenter(this.refactorToArray(pos), zoom);
  }

  /**
   * Adding suggests
   * @param {int} id
   */
  addSuggestView(id) {
    ymaps.ready(() => {
      const suggestView = new ymaps.SuggestView(id, {
        offset: [10, 10],
      });
      suggestView.events.add('select', (e) => {
        const myGeocoder = ymaps.geocode(e.originalEvent.item.value);
        myGeocoder
            .then((res: any) => {
              this.movePosition(this.convertPosArrayToObject(res.geoObjects.get(0).geometry.getCoordinates()));
              this.setCenter(this.convertPosArrayToObject([res.geoObjects.get(0).geometry.getCoordinates(), 1]));
              this.catchCallback(res, false);
            },
            ).catch(
                (err) => {
                  console.log(err.message);
                });
      });
    });
  }

  /**
   * Moving position on map
   * @param {object} pos
   * @param {int} radius
   */
  movePosition(pos, radius = 0) {
    this.addPosition(pos);
    this.circle = this.changeRadius(radius);
  }


  /**
   * Adding position to map
   * @param {object} pos
   */
  addPosition(pos) {
    if (this.pos) {
      this.deletePosition(this.point);
      this.point = this.createPosition(pos);
    }
    this.pos = pos;
  }

  /**
   * Deleting point from map
   * @param {object} point
   */
  deletePosition(point) {
    this.map.geoObjects.remove(point);
  }

  /**
   * Creating position on map
   * @param {object} pos
   * @return {Array}
   */
  createPosition(pos) {
    const point = new ymaps.Placemark(...this.refactorToArray(pos));
    this.map.geoObjects.add(point);

    return point;
  }

  /**
   * Creating circle on map
   * @param {object} pos
   * @param {int} radius
   * @return {object}
   */
  createCircle(pos, radius) {
    if (!radius) {
      if (this.radius) {
        radius = this.radius;
      }
    }
    const circle = new ymaps.Circle([this.refactorToArray(pos), radius]);
    this.map.geoObjects.add(circle);

    return circle;
  }

  /**
   * Changing radius on map
   * @param {int} radius
   * @return {object}
   */
  changeRadius(radius) {
    if (this.circle) {
      this.deleteCircle(this.circle);
    }
    this.circle = this.createCircle(this.pos, radius);
    if (radius) {
      this.radius = radius;
    }
    return this.circle;
  }

  /**
   * Deleting circle from map
   * @param {object} circle
   */
  deleteCircle(circle) {
    this.map.geoObjects.remove(circle);
  }

  /**
   * converting array to object
   * @param {array} coords
   * @return {object}
   */
  convertPosArrayToObject(coords) {
    return {
      latitude: coords[0],
      longitude: coords[1],
    };
  }

  /**
   * Converting object to array
   * @param {object} pos
   * @return {array}
   */
  refactorToArray(pos) {
    return [pos.latitude, pos.longitude];
  }

  /**
   * Checking if address is correct
   * @param {string} address
   */
  static async isAddressCorrect(address: string) {
    const myGeocoder = ymaps.geocode(address);
    return await myGeocoder.then((res: any) => res.geoObjects.get(0));
  }
}
