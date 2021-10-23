import Http from './http.js';
import {auth, logout} from './auth.js';
import eventBus from "./eventBus";
import {AuthStatus} from "../events/Auth";

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
        eventBus.emitEventListener(AuthStatus.userDataCanNotGet, {});
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
    url: '/user/login',
    body: {type, email, phone, password},
  });
}

/**
 * profile get server func
 *
 * @param {string} url
 * @return {Promise<{body: object, status: number}>}
 */
export function profileGet({url = '/user'}) {
  return http.ajaxGet({url})
      .then(auth)
      .catch(() => {
        eventBus.emitEventListener(AuthStatus.userDataCanNotGet, {});
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
  return http.ajaxPost({url: '/user/logout', body: {}})
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

export function addDishPost(dishSettings = {}) {
  return http.ajaxPost({
    url: '/cart',
    body: {
      restId: dishSettings.restId,
      dishId: dishSettings.dishId,
      number: dishSettings.number,
      radios: dishSettings.radios,
      ingredients: dishSettings.ingredients,
    },
  });
}

export function clearCartDelete() {
  return http.ajaxDelete({
    url: '/cart',
    body: {},
  });
}

export function clearDishFromCartDelete(dishId) {
  return http.ajaxDelete({
    url: '/cart',
    body: {
      dishId: dishId,
    },
  });
}

export function updateName(name) {
  return http.ajaxPut({
    url: '/user/name',
    body: {
      name: name,
    },
  });
}

export function updateEmail(email) {
  return http.ajaxPut({
    url: '/user/email',
    body: {
      email: email,
    },
  });
}

export function updatePhone(phone) {
  return http.ajaxPut({
    url: '/user/phone',
    body: {
      phone: phone,
    },
  });
}

export function updatePassword(password) {
  return http.ajaxPut({
    url: '/user/password',
    body: {
      password: password,
    },
  });
}
