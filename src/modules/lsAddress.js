import eventBus from './eventBus.js';
import { AuthStatus } from 'Events/Auth.js';
import {userActions} from  './reducers/userStore.js';
import userStore from './reducers/userStore.js';
import { postAddress } from "./api";

class Address {
    constructor () {
        const address_ = localStorage.address;
        if (address_) {
            const address = JSON.parse(address_);
            this.longitude = address.longitude;
            this.latitude = address.latitude;
            this.name = address.name;
            this.setStoreAddress(address);
        } else {
            this.longitude = '';
            this.latitude = '';
            this.name = '';
        }
        eventBus.addEventListener(AuthStatus.changeAddress, this.setAddress);
    }

    setAddress = ({ longitude, latitude, name }) => {
        localStorage.address = JSON.stringify({ longitude, latitude, name });
        if (userStore.getState().auth) {
            if ((String(longitude) !== String(this.longitude) || String(latitude) !== String(this.latitude) || name !== this.name) &&
                longitude && latitude && name) {
                this.setStoreAddress({
                    aLongitude: longitude,
                    aLatitude: latitude,
                    aName: name,
                })
                postAddress({ longitude: longitude, latitude: latitude, name: name })
                    .then((res) => {
                        if (res.status === 200) {
                            console.log('address set!!!!');
                        } else {
                            console.log('or not ((((');
                        }
                    });
            }
        }
        this.longitude = longitude;
        this.latitude = latitude;
        this.name = name;
    }

    setStoreAddress(cAddress) {
        userStore.dispatch({
            actionType: userActions.storeUserDataUpdate,
            updated: {
                address: cAddress
            }
        })
    }

    getAddress () {
        return { longitude: this.longitude, latitude: this.latitude, name: this.name }
    }
}

export default new Address();
