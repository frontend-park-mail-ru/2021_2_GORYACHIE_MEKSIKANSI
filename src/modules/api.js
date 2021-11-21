import Http from './http.js';
import {auth, logout} from './auth.js';
import eventBus from './eventBus';
import {AuthStatus} from 'Events/Auth';
import {apiPaths} from './consts';

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
    url: apiPaths.signup,
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
    url: apiPaths.login,
    body: {type, email, phone, password},
  });
}

/**
 * profile get server func
 *
 * @param {string} url
 * @return {Promise<{body: object, status: number}>}
 */
export function profileGet({url = apiPaths.getProfile}) {
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
export function restaurantsGet({url = apiPaths.getRestaurants}) {
  return http.ajaxGet({url});
}

/**
 * logout request
 *
 * @param {string} url
 * @return {Promise<{body: object, status: number}>}
 */
export function logoutPost() {
  return http.ajaxPost({url: apiPaths.logout, body: {}})
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
  return http.ajaxGet({url: apiPaths.getCart});
}

/**
 * upadting cart state
 *
 * @param {object} cartState
 * @return {Promise<{body: object, status: number}>}
 */
export function updateCartPut(cartState) {
  return http.ajaxPut({url: apiPaths.updateCart, body: cartState});
}

/**
 * upadting user name
 *
 * @param {string} name
 * @return {Promise<{body: object, status: number}>}
 */
export function updateName(name) {
  return http.ajaxPut({
    url: apiPaths.updateName,
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
    url: apiPaths.updateEmail,
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
    url: apiPaths.updatePhone,
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
    url: apiPaths.updatePassword,
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
    url: apiPaths.updateAvatar,
    body: avatar,
  });
}

/**
 * upadting user address
 *
 * @param {object} address
 * @return {Promise<{body: object, status: number}>}
 */
export function postAddress(address) {
  return http.ajaxPut({
    url: apiPaths.updateAddress,
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
 * pay method
 *
 * @return {Promise<{body: object, status: number}>}
 */
export function postPay() {
  return http.ajaxPost({
    url: apiPaths.pay,
    body: {},
  });
}

/**
 * order history user get
 *
 * @return {Promise<{body: object, status: number}>}
 */
export function orderHistoryGet() {
  return http.ajaxGet({url: apiPaths.getOrdersHistory});
}

/**
 * get reviews for the restaurant
 * @param {number} restaurantId
 * @return {Promise<{body: object, status: number}>}
 */
export function getRestaurantReviews(restaurantId) {
  return http.ajaxGet({url: 'restaurants/' + restaurantId + '/reviews/'});
}

/**
 * post for review to the restaurant
 * @param {number} restaurantId
 * @param {String} text
 * @param {number} rate
 * @return {Object<{status: number, body: Object}>}
 */
export function postReview({
  restaurantId,
  text = '',
  rate = '',
}) {
  return http.ajaxPost({
    url: apiPaths.postReview,
    body: {
      restaurant: {
        id: restaurantId,
      },
      text: text,
      rate: rate,
    },
  });
}

/**
 * order: {
 *   address: {
 *     coordinates: {
 *       latitude,
 *       longitude,
 *     },
 *     city,
 *     street,
 *     house,
 *   },
 *   comment,
 * }
 *
 * Make request to the server to create an order
 *
 * @param {Object} order
 * @return {Object<{status: number, body: Object}>}
 */
export function createOrder(order) {
  return http.ajaxPost({
    url: apiPaths.postOrder,
    body: {
      methodPay: order.methodPay,
      address: order.address,
      comment: order.comment,
    },
  });
}
