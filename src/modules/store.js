// import {userReducer, initialUserState} from "./reducers/userReducer";
// import {addDishToCart, cartReducer, initialCartState} from "./reducers/cartReducer";

import {initialUserState, userReducer} from "./reducers/userReducer";

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

// const initialState = {
//   userState: initialUserState,
//   cartState: initialCartState,
// };

//
export const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export const store = createStoreWithMiddleware(userReducer, initialUserState);
//
export default store;
