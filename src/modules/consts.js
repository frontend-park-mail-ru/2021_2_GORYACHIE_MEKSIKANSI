export const fileMaxSize = 7000000;
export const cloudPrefix = 'https://hmeats-spaces.fra1.cdn.digitaloceanspaces.com';
export const AccessControlAllowOrigin = 'https://hmeats.ru';
export const ServerAddress = 'https://hmeats.ru/api/v1';
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
  favourite: '/user/restaurant/favourite/',
  getOrdersHistory: '/user/order/',
  getProfile: '/user/',
  getRestaurants: '/',
  search: '/restaurant/search',
  wsConnect: `wss://hmeats.ru/api/v1/ws/`,
  recommends: '/restaurant/recommend/',
};

export const paymentMethods = {
  card: 'card',
  cash: 'cash',
};
