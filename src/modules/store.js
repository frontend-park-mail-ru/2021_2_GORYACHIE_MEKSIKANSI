export const actions = {
  storeUserLogin: 'storeUserLogin',
  storeUserLogout: 'storeUserLogout',
  storeCartAddDish: 'storeCartAdd',
  storeCartDeleteDish: 'storeCartDelete',
  storeCartDeleteAll: 'storeCartDeleteAll',
  storeCartIncreaseDishNumber: 'storeCartIncreaseDishNumber',
  storeCartDecreaseDishNumber: 'storeCartDecreaseDishNumber',
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
      };
    case actions.storeUserLogin:
      return {
        ...state,
        auth: true,
        name: action.name,
        email: action.email,
        phone: action.phone,
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
              return {...item, number: Number(item.number) + 1};
            }
            return item;
          });
        }
      } else {
        if (state.find((item) => {
          return JSON.stringify({...item, number: 0, cartId: 0}) === JSON.stringify({...action.dish, number: 0, cartId: 0});
        })) {
          return state.map((item) => {
            if (JSON.stringify({...item, number: 0, cartId: 0}) === JSON.stringify({...action.dish, number: 0, cartId: 0})) {
              return {...item, number: Number(item.number) + Number(action.dish.number)};
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
      if (dish.number > 1) {
        return state.map((item) => {
          if (Number(item.cartId) === Number(action.cartId)) {
            return {...item, number: item.number - 1};
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

function combineReducers(reducersMap) {
  return function combinationReducers(state, action) {
    const nextState = {};
    Object.entries(reducersMap).forEach(([key, reducer]) => {
      nextState[key] = reducer(state[key], action);
    });
    return nextState;
  };
}

const initialState = {
  userState: {
    auth: false,
    name: '',
    phone: '',
    email: '',
  },
  cartState: [],
};

const reducer = combineReducers({
  userState: userReducer,
  cartState: cartReducer,
});

const store = createStore(reducer, initialState);

export default store;
