export class YandexMap {
    constructor () {
        this.initPos = {
            latitude: 55.751574,
            longitude: 37.57385
        };
    }

    customPoint (pos) {
            ymaps.ready(() => {
                this.movePosition(pos);
                this.setCenter(pos);
                this.callback(pos, true);
            });
        }

    render ({
                id,
                pos = this.initPos,
                isStatic = false
            } = {}, callback = () => {}) {
        ymaps.ready(this.start.bind(this, { id, pos, isStatic }, callback));
    }

    start ({
              id,
              pos,
              isStatic
          } = {}, callback) {
        this.callback = callback;
        this.pos = pos;
        document.getElementById(id).innerHTML = '';
        this.map = new ymaps.Map(id, {
            center: this.refactorToArray(this.pos),
            zoom: 11,
            openBalloonOnClick: false,
            controls: []
        });

        if (!isStatic) {
            this.addListeners();
        }
    }

    addListeners () {
        this.map.events.add('click', (e) => {
            const coords = e.get('coords');
            this.movePosition(this.convertPosArrayToObject(coords));
            this.getAddress();
        });
    }

    getAddress () {
        ymaps.geocode(this.refactorToArray(this.pos))
            .then((res) => {
                this.catchCallback(res);
            });
    }

    catchCallback (res, isRenew = true) {
        this.text = this.getUserPositionAddress(res.geoObjects.get(0).properties);
        const address = {
            name: this.text,
            latitude: this.pos.latitude,
            longitude: this.pos.longitude
        };
        this.callback(address, isRenew);
    }

    setCenter (pos, zoom) {
        this.map.setCenter(this.refactorToArray(pos), zoom);
    }

    addSuggestView (id) {
        ymaps.ready(() => {
            const suggestView = new ymaps.SuggestView(id, {
                offset: [10, 10]
            });
            suggestView.events.add('select', (e) => {
                const myGeocoder = ymaps.geocode(e.originalEvent.item.value, {
                    kind: 'house',
                    result: 1,
                });
                myGeocoder
                    .then((res) => {
                        this.movePosition(this.convertPosArrayToObject(res.geoObjects.get(0).geometry.getCoordinates()));
                        this.setCenter(this.convertPosArrayToObject(res.geoObjects.get(0).geometry.getCoordinates(), 1));
                        this.catchCallback(res, false);
                    }
                ).catch(
                    (err) => {
                        console.log(err.message);
                    });
            });
        });
    }

    movePosition (pos, radius = 0) {
        this.addPosition(pos);
        this.circle = this.changeRadius(radius);
    }

    addPosition (pos) {
        if (this.pos) {
            this.deletePosition(this.point);
            this.point = this.createPosition(pos);
        }
        this.pos = pos;
    }

    deletePosition (point) {
        this.map.geoObjects.remove(point);
    }

    createPosition (pos) {
        const point = new ymaps.Placemark(this.refactorToArray(pos));
        this.map.geoObjects.add(point);

        return point;
    }

    createCircle (pos, radius) {
        if (!radius) {
            if (this.radius) {
                radius = this.radius;
            }
        }
        const circle = new ymaps.Circle([this.refactorToArray(pos), radius]);
        this.map.geoObjects.add(circle);

        return circle;
    }

    changeRadius (radius) {
        if (this.circle) {
            this.deleteCircle(this.circle);
        }
        this.circle = this.createCircle(this.pos, radius);
        if (radius) {
            this.radius = radius;
        }
        return this.circle;
    }

    deleteCircle (circle) {
        this.map.geoObjects.remove(circle);
    }

    convertPosArrayToObject (coords) {
        return {
            latitude: coords[0],
            longitude: coords[1]
        };
    }

    refactorToArray (pos) {
        return [pos.latitude, pos.longitude];
    }

    getUserPositionAddress (properties) {
        const prop = properties.get('metaDataProperty').GeocoderMetaData.AddressDetails.Country;
        return prop.AddressLine;
    }

    static async isAddressCorrect (address) {
        const myGeocoder = ymaps.geocode(address);
        return await myGeocoder.then((res) => res.geoObjects.get(0));
    }
}
