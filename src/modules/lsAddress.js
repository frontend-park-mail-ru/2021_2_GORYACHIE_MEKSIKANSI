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
            this.city = address.city;
            this.fullAddress = address.fullAddress;
            this.setStoreAddress(address);
        } else {
            this.longitude = '';
            this.latitude = '';
            this.name = '';
            this.street = '';
            this.city = '';
            this.fullAddress = '';
        }
        eventBus.addEventListener(AuthStatus.changeAddress, this.setAddress);
    }

    setAddress = (address) => {
        localStorage.address = JSON.stringify(address);
        if (userStore.getState().auth) {
            if ((String(address.longitude) !== String(this.longitude) || String(address.latitude) !== String(this.latitude) || address.name !== this.name) &&
                address.longitude && address.latitude && address.name) {
                this.setStoreAddress({
                    longitude: address.longitude,
                    latitude: address.latitude,
                    name: address.name,
                    city: address.city,
                    fullAddress: address.fullAddress,
                })
                postAddress({ longitude: address.longitude, latitude: address.latitude, name: address.name })
                    .then((res) => {
                        if (res.status === 200) {
                            console.log('address set!!!!');
                        } else {
                            console.log('or not ((((');
                        }
                    });
            }
        }
        this.longitude = address.longitude;
        this.latitude = address.latitude;
        this.name = address.name;
        this.city = address.city;
        this.fullAddress = address.fullAddress;
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
        return { longitude: this.longitude,
            latitude: this.latitude,
            name: this.name,
            street: this.street,
            city: this.city,
            fullAddress: this.fullAddress,
        };
    }
}

export default new Address();
