import {updateCartPut} from "../api";
import {createStoreWithMiddleware} from "../store";
import eventBus from "../eventBus";
import {RestaurantEvents} from "../../events/Restaurant";

const cartActions = {
  storeCartAddDish: 'storeCartAdd',
  storeCartDeleteDish: 'storeCartDelete',
  storeCartDecreaseDishCount: 'storeCartDecreaseDishCount',
  storeCartDeleteAll: 'storeCartDeleteAll',
  storeCartIncreaseDishCount: 'storeCartIncreaseDishCount',
  cartRollback: 'storeCartRollback',
  storeCartRestaurantSet: 'storeCartRestaurantSet',
  storeCartRestaurantDelete: 'storeCartRestaurantDelete',
};

const updateStorage = () => {
  localStorage.removeItem('cart');
  localStorage.setItem('cart', JSON.stringify(cartStore.getState()));
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
            return {...item, count: item.count + action.count};
          }
          return item;
        }),
      };
    }
    case cartActions.storeCartDeleteDish: {
      return {
        ...state,
        cart: state.cart.filter((item) => {
          return item.cId !== action.cId;
        }),
      };
    }
    case cartActions.storeCartDecreaseDishCount: {
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.cId === action.cId) {
            return {...item, count: item.count - 1};
          }
          return item;
        }),
      };
    }
    case cartActions.cartRollback: {
      return {
        ...action.state,
      };
    }
    case cartActions.storeCartDeleteAll:
      return {
        restaurant: {
          id: null,
          name: '',
        },
        cart: [],
      };
    case cartActions.storeCartRestaurantSet: {
      return {
        ...state,
        restaurant: {
          ...action.restaurant,
          id: action.restaurant.id,
          name: action.restaurant.name,
        },
      };
    }
    case cartActions.storeCartRestaurantDelete: {
      return {
        ...state,
        restaurant: {
          id: null,
          name: '',
        },
      };
    }
    default:
      return state;
  }
}

export const addDishToCart = (dish, restaurant) => {
  return (dispatch, getState) => {
    const rollbackState = getState();
    if (rollbackState.cart.length === 0 || rollbackState.restaurant.id === null) {
      dispatch({
        actionType: cartActions.storeCartRestaurantSet,
        restaurant: restaurant,
      });
    }
    if (!isItNewDish(dish, getState().cart)) {
      dispatch({
        actionType: cartActions.storeCartAddDish,
        dish: {
          ...dish,
          cId: cId++,
        },
      });
    } else {
      dispatch({
        actionType: cartActions.storeCartIncreaseDishCount,
        cId: isItNewDish(dish, getState().cart).cId,
        count: dish.count,
      });
    }

    // make fetch
    // if ok -> emit success
    // if not ok -> make rollback and emit fail
    updateCartOrRollback(dispatch, getState(), rollbackState);
  };
};

export const deleteDishFromCart = (cId) => {
  return (dispatch, getState) => {
    // find dish
    const foundDish = getState().cart.find((item) => {
      return item.cId === cId;
    });
    if (!foundDish) {
      console.log('Dish not found in cart');
      // emit error, dish not found
      return;
    }

    const rollbackState = getState().cart;
    if (foundDish.count > 1) {
      dispatch({
        actionType: cartActions.storeCartDecreaseDishCount,
        cId: cId,
      });
    } else {
      dispatch({
        actionType: cartActions.storeCartDeleteDish,
        cId: cId,
      });
      if (getState().cart.length === 0) {
        dispatch({
          actionType: cartActions.storeCartRestaurantDelete,
        });
      }
    }

    updateCartOrRollback(dispatch, getState(), rollbackState);
  };
};

export const clearCart = () => {
  return (dispatch, getState) => {
    const rollbackState = getState();
    dispatch({
      actionType: cartActions.storeCartDeleteAll,
    });
    updateCartOrRollback(dispatch, getState(), rollbackState);
  };
};

const updateCartOrRollback = (dispatch, updateState, cartRollbackState) => {
  updateCartPut(updateState)
      .then((response) => {
        if (response === ResponseEvents.OK) {
          // emit smth
        } else {
          dispatch({
            actionType: cartActions.cartRollback,
            state: cartRollbackState,
          });
        }
      })
      .catch(() => {
        // dispatch({
        //   actionType: cartActions.cartRollback,
        //   state: cartRollbackState,
        // });
        eventBus.emitEventListener(RestaurantEvents.restaurantCartUpdateSuccess, {});
        updateStorage();
      });
};

/**
 * If dish is new return undef else return dish in cart
 * @param dish
 * @param cart
 * @return {*}
 */
const isItNewDish = (dish, cart) => {
  return cart.find((item) => {
    return item.id === dish.id &&
      item.radios.toString() === dish.radios.toString() &&
      item.ingredients.toString() === dish.ingredients.toString();
  });
};

let cart = {
  restaurant: {
    id: null,
    name: '',
  },
  cart: [],
};

const localCart = JSON.parse(localStorage.getItem('cart'));
if (localCart) {
  cart = localCart;
}

const cartStore = createStoreWithMiddleware(cartReducer, cart);
export default cartStore;
