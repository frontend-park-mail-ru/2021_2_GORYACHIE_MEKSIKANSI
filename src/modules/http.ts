import {AccessControlAllowOrigin, ServerAddress} from './consts';

const serverAddress = ServerAddress;

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
      'Access-Control-Allow-Origin': AccessControlAllowOrigin,
    },
    body: '',
  };

  if (type === 'application/json') {
    data.headers['Content-Type'] = type;
  }

  if (method !== 'GET') {
    data.body = body;
    if (getCsrfToken()) {
      data.headers['X-Csrf-Token'] = getCsrfToken();
    }
  }

  return data;
}

/**
 * Fetching server
 *
 * @param {Object} params
 * @return {Object<{status: string, body: object}>}
 *
 */
async function makeFetch({
  url = '/',
  method = 'GET',
  body = null,
  type = 'application/json',
} = {}) {
  const response = await fetch(serverAddress + url,
      getData({method, body, type}));
  const responseJSON = await response.json();

  if (method !== 'GET') {
    if (response.headers.get('X-Csrf-Token')) {
      setCsrfToken(response.headers.get('X-Csrf-Token'));
    }
  }

  return responseJSON;
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
     * @return {Object<{status: string, body: object}>}
     *
     */
  ajaxGet({
    url = '/',
  } = {}) {
    return makeFetch({url: url, method: 'GET'});
  }


  /**
     * ajaxPost request
     *
     * @param {{url: string, body: object}} params
     * @return {Object<{status: number, body: object}>}
     *
     */
  async ajaxPost({
    url = '/',
    body = null,
  } = {}) {
    return makeFetch({
      url: url,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  /**
   * ajaxPut request
   *
   * @param {{url: string, body: object}} params
   * @return {Object<{status: number, body: object}>}
   *
   */
  async ajaxPut({
    url = '/',
    body = null,
  } = {}) {
    return makeFetch({
      url: url,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  /**
   * ajaxPutNoStringify request
   *
   * @param {{url: string, body: object}} params
   * @return {Object<{status: number, body: object}>}
   *
   */
  async ajaxPutNoStringify({
    url = '/',
    body = null,
  } = {}) {
    return makeFetch({
      url: url,
      method: 'PUT',
      body: body,
      type: 'image/jpeg',
    });
  }

  /**
   * ajaxDelete request
   *
   * @param {{url: string, body: object}} params
   * @return {Object<{status: number, body: object}>}
   *
   */
  async ajaxDelete({
    url = '/',
    body = null,
  } = {}) {
    return makeFetch({
      url: url, method: 'DELETE',
      body: JSON.stringify(body),
    });
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
