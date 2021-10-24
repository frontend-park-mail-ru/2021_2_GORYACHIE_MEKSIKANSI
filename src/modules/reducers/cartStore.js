import {updateCartPut} from '../api.js';
import {createStoreWithMiddleware} from '../store.js';
import eventBus from '../eventBus.js';
import {RestaurantEvents} from '../../events/Restaurant.js';
import {ResponseEvents} from '../../events/Responses.js';

export const cartActions = {
  update: 'update',
};

export const updateStorage = () => {
  localStorage.removeItem('cart');
  localStorage.setItem('cart', JSON.stringify(cartStore.getState()));
};

let itNum = 0;

export function cartReducer(state, action) {
  switch (action.actionType) {
    case cartActions.update: {
      return {
        ...action.state,
      };
    }
    default:
      return state;
  }
}

const getDishBuffer = (cart) => {
  let cartBuffer = [];
  if (cart !== undefined && cart !== null && cart.length > 0) {
    cart.forEach((dish) => {
      cartBuffer.push({
        itNum: dish.itNum,
        id: dish.id,
        count: dish.count,
        radios: dish.radios,
        ingredients: dish.ingredients,
      });
    });
  }
  return cartBuffer;
}

export const increaseDishInCart = (aItNum) => {
  return (dispatch, getState) => {
    let cartBuffer = getDishBuffer(getState().cart);

    const fDish = cartBuffer.find((dish) => {
      return dish.itNum === aItNum;
    });

    if (fDish) {
      fDish.count += 1;
    }

    updateCart(dispatch, { restaurant: getState().restaurant.id, dishes: cartBuffer });
  }
}

export const addDishToCart = (aDish, restaurant) => {  // find and add count
  return (dispatch, getState) =>  {
    let cartBuffer = getDishBuffer(getState().cart);

    // see desc of function
    if (isNewDish(aDish, cartBuffer)) {
      cartBuffer.push({
        ...aDish,
        itNum: itNum++,
      });
    }

    updateCart(dispatch, { restaurant: restaurant.id, dishes: cartBuffer });
  };
};

export const setCart = (gotCart) => {
  cartStore.dispatch({
    actionType: cartActions.update,
    state: gotCart,
  });
  updateStorage();
}

export const deleteDishFromCart = (itNum) => {
  return (dispatch, getState) => {
    let cartBuffer = getDishBuffer(getState().cart);

    // find dish
    const foundDish = cartBuffer.find((dish) => {
      return dish.itNum === itNum;
    });
    if (!foundDish) {
      // emit error, dish not found
      return;
    }

    if (foundDish.count > 1) {
      foundDish.count -= 1;
    } else {
      cartBuffer.filter((dish) => {
        return dish.itNum !== itNum;
      });
    }

    updateCart(dispatch, {restaurant: getState().restaurant.id, dishes: cartBuffer});
  };
};

export const clearCart = () => {
  return (dispatch, getState) => {
    updateCart(dispatch, {restaurant: null, dishes: []});
  };
};

const updateCart = (dispatch, bufferToUpdate) => {
  updateCartPut(bufferToUpdate)
      .then((response) => {
        if (response.status === ResponseEvents.OK) {
          const action = {
            actionType: cartActions.update,
            state: response.body,
          }
          dispatch(action);
          eventBus.emitEventListener(RestaurantEvents.restaurantCartUpdateSuccess, {})
          updateStorage();
        } else {
          eventBus.emitEventListener(RestaurantEvents.restaurantCartUpdateFailed, {});
        }
      })
      .catch(() => {
        eventBus.emitEventListener(RestaurantEvents.restaurantCartUpdateFailed, {});
      });
};

/**
 * If dish is new return true
 * If dish not new increment count and return false
 * @param dish
 * @param cart
 * @return {*}
 */
const isNewDish = (dish, cart) => {
  const fDish = cart.find((item) => {
    return item.id === dish.id &&
        item.radios.toString() === dish.radios.toString() &&
        item.ingredients.toString() === dish.ingredients.toString();
  });
  if (fDish) {
    fDish.count += dish.count;
    return false;
  }

  return true;
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
