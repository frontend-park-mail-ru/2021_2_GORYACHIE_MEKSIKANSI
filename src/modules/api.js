import Http from './http.js';
import {auth} from './auth.js';

const http = new Http();

/**
 * Server post request to register user/courier/host
 *
 * @param {string} type
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 * @param {object} password
 * @return {Promise<{parsedJSON: object, status: number}>}
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
    url: '/signup',
    body: {
      type,
      name,
      email,
      phone,
      password,
    },
  })
      .then(auth);
}

/**
 * Server post request to login user/courier/host
 *
 * @param {string} email
 * @param {object} phone
 * @param {string} password
 * @return {Object<{parsedJSON: object, status: number}>}
 */
export function loginPost({type, email, phone, password}) {
  return http.ajaxPost({
    url: '/login',
    body: {type, email, phone, password},
  });
}

/**
 * profile get server func
 *
 * @param {string} url
 * @return {Promise<{parsedJSON: object, status: number}>}
 */
export function profileGet({url = '/profile'}) {
  return http.ajaxGet({url})
      .then(auth);
}

/**
 * restaurants get
 *
 * @param {string} url
 * @return {Promise<{parsedJSON: object, status: number}>}
 */
export function restaurantsGet({url = '/'}) {
  return http.ajaxGet({url});
}

/**
 * logout request
 *
 * @param {string} url
 * @return {Promise<{parsedJSON: object, status: number}>}
 */
export function logoutPost() {
  return http.ajaxPost({url: '/logout', body: {}});
}


/**
 * getting restaurant with dishes
 *
 * @param {string} url
 * @return {Promise<{parsedJSON: object, status: number}>}
 */
export function restaurantGet({url = '/restaurants/0'}) {
  return http.ajaxGet({url});
}

/**
 * getting dish of restaurant
 *
 * @param {string} url
 * @return {Promise<{parsedJSON: object, status: number}>}
 */
export function dishGet({url = '/restaurants/0/dish/0'}) {
  return http.ajaxGet({url});
}

export function addDishPost({restId, dishId}) {
  return http.ajaxPost({
    url: 'cart/',
    body: {restId, dishId},
  });
}