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
 * @returns {Promise<{parsedJSON: object, status: number}>}
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
 * @return {Promise<{parsedJSON: object, status: number}>}
 */
export function loginPost({type, email, phone, password}) {
  return http.ajaxPost({
    url: '/login',
    body: {type, email, phone, password},
  })
      .then(auth);
}

export function profileGet({url = '/profile'}) {
  return http.ajaxGet({url});
}

export function restaurantsGet({url = '/'}) {
  return http.ajaxGet({url});
}

export function checkAuth({url = '/check'}) {
  return http.ajaxGet({url});
}
