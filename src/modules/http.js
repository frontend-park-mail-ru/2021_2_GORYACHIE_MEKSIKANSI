import {debugFunc} from './debugMod.js';

window.serverAddress = 'http://127.0.0.1:5000/api';

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
      'Access-Control-Allow-Origin': 'http://127.0.0.1',
    },
  };

  if (type === 'application/json') {
    data.headers['Content-Type'] = type;
  }

  if (method !== 'GET') {
    data.body = body;

    const csrf = this.getCsrfToken();
    if (csrf) {
      data.header['X-CSRF-Token'] = csrf;
    }
    debugFunc(csrf, 'csrf token value');
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

  if (method !== 'GET') {
    if (response.headers.get('X-CSRF-Token')) {
      this.setCsrfToken(response.headers.get('X-CSRF-Token'));
    }
  }

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
    return await makeFetch({url: url, method: 'POST', body: JSON.stringify(body)})
        .then((response) => {
          this.setCsrfToken(response.parsedJSON.csrfToken);
        })
  }

  setCsrfToken(token) {
    localStorage.setItem('token', token);
  }

  getCsrfToken() {
    return localStorage.getItem('token');
  }
}
