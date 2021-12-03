import eventBus from './eventBus';
import {AuthStatus} from 'Events/Auth';
import {userActions} from './reducers/userStore';
import userStore from './reducers/userStore';
import {postAddress} from './api';

/**
 * User Address class
 */
class Address {
  /**
   * Standard constructor for address class
   */
  constructor() {
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

  /**
   * Setting user address
   * @param {object} address
   */
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
        });
        postAddress({longitude: address.longitude, latitude: address.latitude, name: address.name})
            .then((res) => {
              // something
            });
      }
    }
    this.longitude = address.longitude;
    this.latitude = address.latitude;
    this.name = address.name;
    this.city = address.city;
    this.fullAddress = address.fullAddress;
  }

  /**
   * Setting address to user store
   * @param {object} cAddress
   */
  setStoreAddress(cAddress) {
    userStore.dispatch({
      actionType: userActions.storeUserDataUpdate,
      updated: {
        address: cAddress,
      },
    });
  }

  /**
   * getting address of user
   * @return {object}
   */
  getAddress() {
    return {longitude: this.longitude,
      latitude: this.latitude,
      name: this.name,
      street: this.street,
      city: this.city,
      fullAddress: this.fullAddress,
    };
  }
}

export default new Address();
