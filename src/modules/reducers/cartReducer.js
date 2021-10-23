const cartActions = {
  storeCartAddDish: 'storeCartAdd',
  storeCartDeleteDish: 'storeCartDelete',
  storeCartDeleteAll: 'storeCartDeleteAll',
  storeCartIncreaseDishCount: 'storeCartIncreaseDishCount',
  storeCartRestaurantSet: 'storeCartRestaurantSet',
  storeCartRestaurantDelete: 'storeCartRestaurantDelete',
};

let cId = 0;

export function cartReducer(state, action) {
  switch (action.actionType) {
    case cartActions.storeCartAddDish: {
      return {
        ...state,
        cart: [
          ...state.cart,
          action.dish,
        ],
      };
    }
    case cartActions.storeCartIncreaseDishCount: {
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.cId === action.cId) {
            return {...item, count: item.count + 1};
          }
          return item;
        }),
      };
    }
    case cartActions.storeCartDeleteDish: {

    }
    case cartActions.storeCartDeleteAll:
      return [];
    default:
      return state;
  }
}

const addDishToCart = (dish) => {
  return (dispatch, getState) => {
    const currentState = getState();
    if (isItNewDish()) {
      dispatch({
        actionType: cartActions.storeCartAddDish,
        dish: {
          cId: cId++,
          ...dish,
        },
      });
    } else {
      dispatch({
        actionType: cartActions.storeCartIncreaseDishCount,
        cId: isItNewDish().cId,
      });
    }

    // make fetch
    // if ok -> emit success
    // if not ok -> make rollback and emit fail
  };
};

/**
 * If dish is new return undef else return dish in cart
 * @param dish
 * @param cart
 * @return {*}
 */
const isItNewDish = (dish, cart) => {
  return cart.find((item) => {
    return JSON.stringify({...item, count: 0, cId: 0}) === JSON.stringify({...dish, count: 0, cId});
  });
};

let cart = {
  restaurant: {
    id: -1,
    name: '',
  },
  cart: [],
};

const localCart = JSON.parse(localStorage.getItem('cart'));
if (localCart) {
  cart = localCart;
}

export const initialCartState = cart;
