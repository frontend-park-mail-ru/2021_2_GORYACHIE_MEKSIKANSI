import Http from './http.js';

const http = new Http()

/**
 * Server post request to register user/courier/host
 *
 * @param {string} name
 * @param {object} type
 * @param {object} login
 * @param {string} password
 * @returns {Promise<{parsedJSON: object, status: number}>}
 *
 */

export function signupPost({name, type, login, password}) {
    return http.ajaxPost({
        url: '/auth/signup',
        body: {
            name,
            type,
            contacts: login,
            password
        }
    })
        .then()
}

/**
 * Server post request to login user/courier/host
 *
 * @param {object} type
 * @param {object} login
 * @param {string} password
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function loginPost ({ type, login, password }) {
    return http.ajaxPost({
        url: '/auth/login',
        body: {type, login, password}
    })
        .then()
}