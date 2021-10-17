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

function cartReducer(state, action) {
  switch (action.actionType) {
    case actions.storeCartAddDish: {
      const dish = state.find((item) => {
        return item.id === action.dish.id;
      });
      if (dish) {
        return state.map((item) => {
          if (item.id === action.dish.id) {
            return {...item, number: item.number + 1};
          }
          return item;
        });
      }
      return [
        ...state,
        action.dish,
      ];
    }
    case actions.storeCartDeleteDish: {
      const dish = state.find((item) => {
        return item.id === action.id;
      });
      console.log(state, dish, action);
      if (dish.number > 1) {
        return state.map((item) => {
          if (item.id === action.id) {
            return {...item, number: item.number - 1};
          }
        });
      }
      return state.filter((item) => {
        return item.id !== action.id;
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
