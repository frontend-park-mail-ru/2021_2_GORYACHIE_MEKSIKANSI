/**
 * Create specific store
 * @param {function} reducer
 * @param {object} initialState
 * @return {object}
 */
export function createStore(reducer, initialState) {
  let state = initialState;
  return {
    dispatch: (action) => {
      state = reducer(state, action);
    },
    getState: () => state,
  };
}


/**
 * Something that i can't understand
 * @param {object} store
 * @param {object} dispatch
 * @param {object} action
 * @return {object}
 */
const thunk = (store) => (dispatch) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return dispatch(action);
};


/**
 * Setting middleware for store
 * @param {object} middleware
 * @return {object}
 */
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


/**
 * Combining reducers for store
 * @param {object} reducersMap
 * @return {object}
 */
export function combineReducers(reducersMap: Object) {
  return function combinationReducers(state, action) {
    const nextState = {};
    Object.entries(reducersMap).forEach(([key, reducer]) => {
      nextState[key] = reducer(state[key], action);
    });
    return nextState;
  };
}

export const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
