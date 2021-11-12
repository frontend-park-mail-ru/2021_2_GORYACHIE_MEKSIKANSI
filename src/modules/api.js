import Http from './http.js';
import {auth, logout} from './auth.js';
import eventBus from './eventBus';
import {AuthStatus} from 'Events/Auth';

const http = new Http();

/**
 * Server post request to register user/courier/host
 *
 * @param {string} type
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 * @param {object} password
 * @return {Promise<{body: object, status: number}>}
 *
 */
export function signupPost({
  type,
  name,
  email,
  phone,
  password,
}) {
  return http.ajaxPost({
    url: '/user/signup',
    body: {
      type,
      name,
      email,
      phone,
      password,
    },
  })
      .then(auth)
      .catch(() => {
        eventBus.emitEventListener(AuthStatus.notAuth, {});
      });
}

/**
 * Server post request to login user/courier/host
 *
 * @param {string} email
 * @param {object} phone
 * @param {string} password
 * @return {Object<{body: object, status: number}>}
 */
export function loginPost({type, email, phone, password}) {
  return http.ajaxPost({
    url: '/user/login/',
    body: {type, email, phone, password},
  });
}

/**
 * profile get server func
 *
 * @param {string} url
 * @return {Promise<{body: object, status: number}>}
 */
export function profileGet({url = '/user/'}) {
  return http.ajaxGet({url})
      .then(auth)
      .catch(() => {
        eventBus.emitEventListener(AuthStatus.notAuth, {});
      });
}

/**
 * restaurants get
 *
 * @param {string} url
 * @return {Promise<{body: object, status: number}>}
 */
export function restaurantsGet({url = '/'}) {
  return http.ajaxGet({url});
}

/**
 * logout request
 *
 * @param {string} url
 * @return {Promise<{body: object, status: number}>}
 */
export function logoutPost() {
  return http.ajaxPost({url: '/user/logout/', body: {}})
      .then(logout);
}


/**
 * getting restaurant with dishes
 *
 * @param {string} url
 * @return {Promise<{body: object, status: number}>}
 */
export function restaurantGet({url = '/restaurant/0'}) {
  return http.ajaxGet({url});
}

/**
 * getting dish of restaurant
 *
 * @param {string} url
 * @return {Promise<{body: object, status: number}>}
 */
export function dishGet({url = '/restaurants/0/dish/0'}) {
  return http.ajaxGet({url});
}

/**
 * getting cart
 *
 * @return {Promise<{body: object, status: number}>}
 */
export function cartGet() {
  return http.ajaxGet({url: '/user/cart/'});
}

/**
 * upadting cart state
 *
 * @param {object} cartState
 * @return {Promise<{body: object, status: number}>}
 */
export function updateCartPut(cartState) {
  return http.ajaxPut({url: '/user/cart/', body: cartState});
}

/**
 * upadting user name
 *
 * @param {string} name
 * @return {Promise<{body: object, status: number}>}
 */
export function updateName(name) {
  return http.ajaxPut({
    url: '/user/name/',
    body: {
      name: name,
    },
  });
}

/**
 * upadting user mail
 *
 * @param {string} email
 * @return {Promise<{body: object, status: number}>}
 */
export function updateEmail(email) {
  return http.ajaxPut({
    url: '/user/email/',
    body: {
      email: email,
    },
  });
}

/**
 * upadting user phone
 *
 * @param {string} phone
 * @return {Promise<{body: object, status: number}>}
 */
export function updatePhone(phone) {
  return http.ajaxPut({
    url: '/user/phone/',
    body: {
      phone: phone,
    },
  });
}

/**
 * upadting user password
 *
 * @param {string} password
 * @return {Promise<{body: object, status: number}>}
 */
export function updatePassword(password) {
  return http.ajaxPut({
    url: '/user/password/',
    body: {
      password: password,
    },
  });
}

/**
 * upadting user avatar
 *
 * @param {formdata} avatar
 * @return {Promise<{body: object, status: number}>}
 */
export function updateAvatar(avatar) {
  return http.ajaxPutNoStringify({
    url: '/user/avatar/',
    body: avatar,
  });
}

/**
 * updating user address
 *
 * @param {object} address
 * @return {Promise<{body: object, status: number}>}
 */
export function postAddress(address) {
  return http.ajaxPut({
    url: '/user/address',
    body: {
      address: {
        coordinates: {
          latitude: address.latitude,
          longitude: address.longitude,
        },
        city: address.city,
        alias: address.name,
      },
    },
  });
}

/**
 * get order history method
 *
 * @return {Promise<{body: object, status: number}>}
 */
export function getOrderHistory() {
  return http.ajaxGet({url: 'user/orders/'});
}

/**
 * pay method
 *
 * @return {Promise<{body: object, status: number}>}
 */
export function postPay() {
  return http.ajaxPost({
    url: '/user/pay',
    body: {},
  });
}

