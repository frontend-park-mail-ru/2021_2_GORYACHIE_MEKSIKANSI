export const actions = {
  storeUserLogin: 'storeUserLogin',
  storeUserLogout: 'storeUserLogout',
  storeUserDataUpdate: 'storeUserDataUpdate',
  storeCartAddDish: 'storeCartAdd',
  storeCartDeleteDish: 'storeCartDelete',
  storeCartDeleteAll: 'storeCartDeleteAll',
  storeCartIncreaseDishNumber: 'storeCartIncreaseDishNumber',
  storeCartDecreaseDishNumber: 'storeCartDecreaseDishNumber',
  storeCartRestaurantSet: 'storeCartRestaurantSet',
  storeCartRestaurantDelete: 'storeCartRestaurantDelete',
};

function createStore(reducer, initialState) {
  let state = initialState;
  return {
    dispatch: (action) => {
      state = reducer(state, action);
    },
    getState: () => state,
  };
}

function userReducer(state, action) {
  switch (action.actionType) {
    case actions.storeUserLogout:
      return {
        ...state,
        auth: false,
        name: '',
        email: '',
        phone: '',
        avatar: '',
      };
    case actions.storeUserLogin:
      return {
        ...state,
        auth: true,
        name: action.name,
        email: action.email,
        phone: action.phone,
        avatar: action.avatar,
      };
    case actions.storeUserDataUpdate:
      return {
        ...state,
        ...action.updated,
      };
    default:
      return state;
  }
}

let cartId = 0;

function cartReducer(state, action) {
  switch (action.actionType) {
    case actions.storeCartAddDish: {
      if ('cartId' in action.dish) {
        if (state.find((item) => {
          return item.cartId === action.dish.cartId;
        })) {
          return state.map((item) => {
            if (item.cartId === action.dish.cartId) {
              return {...item, num: Number(item.num) + 1};
            }
            return item;
          });
        }
      } else {
        if (state.find((item) => {
          return JSON.stringify({...item, num: 0, cartId: 0}) === JSON.stringify({...action.dish, num: 0, cartId: 0});
        })) {
          return state.map((item) => {
            if (JSON.stringify({...item, num: 0, cartId: 0}) === JSON.stringify({...action.dish, num: 0, cartId: 0})) {
              return {...item, num: Number(item.num) + Number(action.dish.num)};
            }
            return item;
          });
        }
      }

      return [
        ...state,
        {
          ...action.dish,
          cartId: cartId++,
        },
      ];
    }
    case actions.storeCartDeleteDish: {
      const dish = state.find((item) => {
        return Number(item.cartId) === Number(action.cartId);
      });
      if (dish.num > 1) {
        return state.map((item) => {
          if (Number(item.cartId) === Number(action.cartId)) {
            return {...item, num: item.num - 1};
          }
          return item;
        });
      }
      return state.filter((item) => {
        return Number(item.cartId) !== Number(action.cartId);
      });
    }
    case actions.storeCartDeleteAll:
      return [];
    default:
      return state;
  }
}

function cartRestaurantReducer(state, action) {
  switch (action.actionType) {
    case actions.storeCartRestaurantSet: {
      return action.restaurant;
    }
    case actions.storeCartRestaurantDelete: {
      return null;
    }
    default: return state;
  }
}

function combineReducers(reducersMap) {
  return function combinationReducers(state, action) {
    const nextState = {};
    Object.entries(reducersMap).forEach(([key, reducer]) => {
      nextState[key] = reducer(state[key], action);
    });
    return nextState;
  };
}

let localCart = JSON.parse(localStorage.getItem('cart'));
if (!localCart) {
  localCart = [];
}

let localRestaurant = JSON.parse(localStorage.getItem('cartRestaurant'));
if (!localCart || !localRestaurant) {
  localCart = [];
  localRestaurant = null;
}

const initialState = {
  userState: {
    auth: false,
    name: '',
    phone: '',
    email: '',
    avatar: '',
    address: {
      aLatitude: 55.751574,
      aLongitude: 37.57385,
      aName: 'Москва',
    }
  },
  cartState: localCart,
  cartRestaurantState: localRestaurant,
};

const reducer = combineReducers({
  userState: userReducer,
  cartState: cartReducer,
  cartRestaurantState: cartRestaurantReducer,
});

const store = createStore(reducer, initialState);

export default store;
