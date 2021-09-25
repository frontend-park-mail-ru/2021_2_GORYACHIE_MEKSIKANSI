import {debugFunc} from './debugMod.js';

window.serverAddress = 'http://127.0.0.1:5000';

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
    mode: 'cors',
    credentials: 'include',
    method,
    headers: {
      'Access-Control-Allow-Origin': 'http://127.0.0.1',
    },
  };

  if (type === 'application/json') {
    data.headers['Content-Type'] = type;
  }

  if (method !== 'GET') {
    data.body = body;
  }

  if (method !== 'GET') {
    const csrf = document.cookie.match(/csrf=([\w]+)/);
    debugFunc(csrf, 'csrf token value');
    if (csrf) {
      data.header['X-XSRF-Token'] = csrf;
    }
  }

  return data;
}

/**
 * Fetching server
 *
 * @param {Object<{url: string, method: string, body: object, type: string}>} params
 * @return {Object<{status: string, parsedJSON: object}>}
 *
 */
async function makeFetch({
  url = '/',
  method = 'GET',
  body = null,
  type = 'application/json',
} = {}) {
  const response = await fetch(window.serverAddress + url, getData({method, body, type}));
  const responseJSON = await response.json();

  return {
    status: responseJSON.status,
    parsedJSON: responseJSON.parsedJSON,
  };
}

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
    return await makeFetch({url: url, method: 'POST', body: body});
  }
}
