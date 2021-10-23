import {userReducer, initialUserState} from "./reducers/userReducer";
import {cartReducer, initialCartState} from "./reducers/cartReducer";

function createStore(reducer, initialState) {
  let state = initialState;
  return {
    dispatch: (action) => {
      state = reducer(state, action);
    },
    getState: () => state,
  };
}

const thunk = (store) => (dispatch) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return dispatch(action);
};

function applyMiddleware(middleware) {
  return function createStoreWithMiddleware(createStore) {
    return (reducer, state) => {
      const store = createStore(reducer, state);

      return {
        dispatch: (action) => middleware(store)(store.dispatch)(action),
        getState: store.getState,
      };
    };
  };
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
  userState: initialUserState,
  cartState: initialCartState,
};

const reducer = combineReducers({
  userState: userReducer,
  cartState: cartReducer,
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer, initialState);

export default store;
