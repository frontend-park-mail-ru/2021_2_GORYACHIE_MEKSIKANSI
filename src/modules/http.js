import {debugFunc} from './debugMod.js';

window.serverAddress = 'http://167.172.179.1:5000/api';

/**
 * Getting object data with info to fetch
 *
 * @param {{method: string, body: object, type: string}} params
 * @return {Object}
 *
 */
function getData({
  method = 'GET',
  body = null,
  type = 'application/json; charset=utf8',
} = {}) {
  const data = {
    method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Origin': 'http://167.172.179.1',
    },
  };

  if (type === 'application/json') {
    data.headers['Content-Type'] = type;
  }

  if (method !== 'GET') {
    data.body = body;
    if (getCsrfToken()) {
      data.header['X-CSRF-Token'] = getCsrfToken();
    }
    debugFunc(getCsrfToken(), 'csrf token value');
  }

  return data;
}

/**
 * Fetching server
 *
 * @param {Object} params
 * @return {Object<{status: string, parsedJSON: object}>}
 *
 */
async function makeFetch({
  url = '/',
  method = 'GET',
  body = null,
  type = 'application/json',
} = {}) {
  const response = await fetch(window.serverAddress + url,
      getData({method, body, type}));
  const responseJSON = await response.json();

  if (method !== 'GET') {
    if (response.headers.get('X-CSRF-Token')) {
      setCsrfToken(response.headers.get('X-CSRF-Token'));
    }
  }

  return {
    status: responseJSON.status,
    parsedJSON: responseJSON.parsedJSON,
  };
}

/**
 * Http class for get and post req
 *
 */
export default class Http {
  /**
     * ajaxGet request
     *
     * @param {{url: string}} params
     * @return {Object<{status: string, parsedJSON: object}>}
     *
     */
  async ajaxGet({
    url = '/',
  } = {}) {
    return await makeFetch({url: url, method: 'GET'});
  }


  /**
     * ajaxPost request
     *
     * @param {{url: string, body: object}} params
     * @return {Object<{status: string, parsedJSON: object}>}
     *
     */
  async ajaxPost({
    url = '/',
    body = null,
  } = {}) {
    return await makeFetch({url: url, method: 'POST',
      body: JSON.stringify(body)});
  }
}
/**
 * setting csrf token
 * @param {string} token
 *
 */
function setCsrfToken(token) {
  localStorage.setItem('token', token);
}

/**
 * getting csrf token
 * @return {string}
 */
function getCsrfToken() {
  return localStorage.getItem('token');
}
