

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
  switch (action.type) {
    case 'LOGIN': {
      console.log(action);
      const state = {
        // ...state,
        user: {
          auth: true,
          name: action.name,
          email: action.email,
          phone: action.phone,
        },
      };
      console.log(state.user);
      console.log(state);
      return state;
    }
    case 'LOGOUT': {
      state.user = {
        ...state.user,
        auth: false,
        name: '',
        email: '',
        phone: '',
      };
      return state;
    }
    default:
      return state;
  }
}

const us3r = {
  auth: false,
  name: '',
  phone: '',
  email: '',
};

const initialState = {
  user: us3r,
};

export const store = createStore(userReducer, initialState);
