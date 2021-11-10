import {createStore} from '../store';

export const userActions = {
  storeUserLogin: 'storeUserLogin',
  storeUserLogout: 'storeUserLogout',
  storeUserDataUpdate: 'storeUserDataUpdate',
};

export function userReducer(state, action) {
  switch (action.actionType) {
    case userActions.storeUserLogout:
      return {
        ...state,
        auth: false,
        name: '',
        email: '',
        phone: '',
        avatar: '',
      };
    case userActions.storeUserLogin:
      return {
        ...state,
        auth: true,
        name: action.name,
        email: action.email,
        phone: action.phone,
        avatar: 'https://img.hmeats.fra1.cdn.digitaloceanspaces.com' + action.avatar,
      };
    case userActions.storeUserDataUpdate:
      return {
        ...state,
        ...action.updated,
      };
    default:
      return state;
  }
}

export const initialUserState = {
  auth: false,
  name: '',
  phone: '',
  email: '',
  avatar: '',
  address: {
    latitude: 55.751574,
    longitude: 37.57385,
    name: 'Москва',
    street: 'ул. Пушкин',
    city: 'Москва',
    fullAddress: 'дом Колотушкина',
  },
};

const userStore = createStore(userReducer, initialUserState);
export default userStore;
