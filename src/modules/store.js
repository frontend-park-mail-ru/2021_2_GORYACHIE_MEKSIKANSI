export const actions = {
  storeUserLogin: 'storeUserLogin',
  storeUserLogout: 'storeUserLogout',
  storeCartAdd: 'storeCartAdd',
  storeCartDelete: 'storeCartDelete',
  storeCartDeleteAll: 'storeCartDeleteAll',
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
    case actions.storeCartAdd:
      return [
        ...state,
        action.dish,
      ];
    case actions.storeCartDelete:
      return state.filter((item) => {
        return item.restId !== action.restId || item.itemId !== action.itemId;
      });
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
