import eventBus from './eventBus.js';
import { AuthStatus } from 'Events/Auth.js';
import store, { actions } from './store.js';

class Address {
    constructor () {
        const address_ = localStorage.address;
        if (address_) {
            const address = JSON.parse(address_);
            this.longitude = address.longitude;
            this.latitude = address.latitude;
            this.name = address.name;
        } else {
            this.longitude = '';
            this.latitude = '';
            this.name = '';
        }
        eventBus.addEventListener(AuthStatus.changeAddress, this.setAddress.bind(this));
    }

    setAddress ({ longitude, latitude, name }) {
        localStorage.address = JSON.stringify({ longitude, latitude, name });
        if (store.getState().userState.auth) {
            if ((String(longitude) !== String(this.longitude) || String(latitude) !== String(this.latitude) || name !== this.name) &&
                longitude && latitude && name) {
                store.dispatch({
                    actionType: actions.storeUserDataUpdate,
                    updated: {
                        address: {
                            aLongitude: longitude,
                            aLatitude: latitude,
                            aName: name,
                        }
                    }
                })
                console.log(store.getState().userState.address);
                // postAddress({ longitude: String(longitude), latitude: String(latitude), name })
                //     .then((res) => {
                //         if (res.status === 200) {
                //
                //         }
                //     });
            }
        }
        this.longitude = longitude;
        this.latitude = latitude;
        this.name = name;
    }

    getAddress () {
        return { longitude: this.longitude, latitude: this.latitude, name: this.name }
    }
}

export default new Address();
