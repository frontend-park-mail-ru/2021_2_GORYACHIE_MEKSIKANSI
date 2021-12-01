export const fileMaxSize = 7000000;
export const cloudPrefix = 'https://hmeats-spaces.fra1.cdn.digitaloceanspaces.com';
export const AccessControlAllowOrigin = 'http://127.0.0.1';
export const ServerAddress = 'http://127.0.0.1:5000/api/v1';
export const updateStatusTimeout = 20000;
export const statusMap = {
  1: `обработан`,
  2: `готовится`,
  3: `еда уже едет к вам`,
  4: `успешно доставлен`,
};

export const apiPaths = {
  signup: '/user/signup/',
  login: '/user/login/',
  logout: '/user/logout/',
  getCart: '/user/cart/',
  updateCart: '/user/cart/',
  updateName: '/user/name/',
  updateEmail: '/user/email/',
  updatePhone: '/user/phone/',
  updatePassword: '/user/password/',
  updateAvatar: '/user/avatar/',
  updateAddress: '/user/address/',
  postReview: '/user/review/',
  postOrder: '/user/order/',
  getOrder: '/user/order/',
  pay: '/user/pay/',
  getOrdersHistory: '/user/order/',
  getProfile: '/user/',
  getRestaurants: '/',
  search: '/restaurant/search',
  wsConnect: `ws://127.0.0.1:5000/api/v1/ws/`,
};

export const paymentMethods = {
  card: 'card',
  cash: 'cash',
};
