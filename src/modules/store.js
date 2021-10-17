export const actions = {
  storeUserLogin: 'storeUserLogin',
  storeUserLogout: 'storeUserLogout',
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
        user: {
          auth: false,
          name: '',
          email: '',
          phone: '',
        },
      };
    case actions.storeUserLogin:
      return {
        ...state,
        user: {
          auth: true,
          name: action.name,
          email: action.email,
          phone: action.phone,
        },
      };
    default:
      return state;
  }
}

const initialState = {
  user: {
    auth: false,
    name: '',
    phone: '',
    email: '',
  },
};

const store = createStore(userReducer, initialState);

export default store;
