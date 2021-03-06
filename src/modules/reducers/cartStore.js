import {updateCartPut} from '../api.js';
import {createStoreWithMiddleware} from '../store.js';
import eventBus from '../eventBus.js';
import {RestaurantEvents} from 'Events/Restaurant.js';
import {ResponseEvents} from 'Events/Responses.js';
import {CreateSnack} from '../../components/snackBar/snackBar';

export const cartActions = {
  update: 'update',
};

export const updateStorage = () => {
  localStorage.removeItem('cart');
  localStorage.setItem('cart', JSON.stringify(cartStore.getState()));
};

let itNum = 0;

/**
 * cart store reducer
 * @param {object} state
 * @param {Object} action
 * @return {object}
 */
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

/**
 * Getting dish buffer
 * @param {object} cart
 * @return {object}
 */
const getDishBuffer = (cart) => {
  const cartBuffer = [];
  if (cart !== undefined && cart !== null && cart.length > 0) {
    cart.forEach((dish) => {
      cartBuffer.push({
        itNum: dish.itNum,
        id: dish.id,
        count: dish.count,
        radios: dish.radios ? dish.radios : [],
        ingredients: dish.ingredients ? dish.ingredients : [],
      });
    });
  }
  return cartBuffer;
};

/**
 * Increasting dish in cart
 * @param {int} aItNum
 * @return {Function}
 */
export const increaseDishInCart = (aItNum) => {
  return (dispatch, getState) => {
    const cartBuffer = getDishBuffer(getState().cart);

    const fDish = cartBuffer.find((dish) => {
      return dish.itNum === aItNum;
    });

    if (fDish) {
      fDish.count += 1;
    }

    updateCart(dispatch, {cart: {restaurant: {id: getState().restaurant.id}, dishes: cartBuffer}});
  };
};

/**
 * Adding dish to cart
 * @param {object} aDish
 * @param {Object} restaurant
 * @return {Function}
 */
export const addDishToCart = (aDish, restaurant) => { // find and add count
  return (dispatch, getState) => {
    const cartBuffer = getDishBuffer(getState().cart);

    // see desc of function
    if (isNewDish(aDish, cartBuffer)) {
      cartBuffer.push({
        ...aDish,
        itNum: itNum++,
      });
    }
    updateCart(dispatch, {cart: {restaurant: {id: restaurant.id}, dishes: cartBuffer}});
  };
};

/**
 * Clearing cart method
 * @param {Object} aDish
 * @param {Object} restaurant
 * @return {Function}
 */
export const clearCartAndAddDish = (aDish, restaurant) => {
  return (dispatch, getState) => {
    updateCart(dispatch, {cart: {restaurant: {id: restaurant.id}, dishes: [aDish]}});
  };
};

/**
 * setting cart method
 * @param {object} response
 */
export const setCart = (response) => {
  const wrapperStruct = {
    cart: response.dishes,
    restaurant: response.restaurant,
    cost: response.cost,
  };
  cartStore.dispatch({
    actionType: cartActions.update,
    state: wrapperStruct,
  });
  eventBus.emitEventListener(RestaurantEvents.restaurantCartUpdateSuccess, {});
};

/**
 * Deleting dish from cart
 * @param {int} itNum
 * @return {Function}
 */
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
      cartBuffer = cartBuffer.filter((dish) => {
        return dish.itNum !== itNum;
      });
    }

    let restId = getState().restaurant.id;
    if (cartBuffer.length === 0) {
      restId = -1;
    }
    updateCart(dispatch, {cart: {restaurant: {id: restId}, dishes: cartBuffer}});
  };
};

export const clearCart = () => {
  return (dispatch, getState) => {
    updateCart(dispatch, {cart: {restaurant: {id: -1}, dishes: []}});
  };
};

const updateCart = (dispatch, bufferToUpdate) => {
  updateCartPut(bufferToUpdate)
      .then((response) => {
        if (response.status === ResponseEvents.OK && !('dishesErrs' in response.body.cart)) {
          const wrapperStruct = {
            cart: response.body.cart.dishes,
            restaurant: response.body.cart.restaurant,
            cost: response.body.cart.cost,
          };

          const action = {
            actionType: cartActions.update,
            state: wrapperStruct,
          };
          dispatch(action);
          eventBus.emitEventListener(RestaurantEvents.restaurantCartUpdateSuccess, {});
          return response;
        } else {
          CreateSnack({
            title: '??????-???? ?????????? ???? ??????! ?????????????? ???? ??????????????????',
            status: 'red',
          });
          eventBus.emitEventListener(RestaurantEvents.restaurantCartUpdateFailed, response);
        }
      })
      .catch(() => {
        eventBus.emitEventListener(RestaurantEvents.restaurantCartUpdateFailed, {});
      });
};


const compareRadios = (radios1, radios2) => {
  if (radios1.length !== radios2.length) {
    return false;
  }
  radios1.sort((a, b) => {
    return Number(a.rId) < Number(b.rId);
  });
  radios2.sort((a, b) => {
    return Number(a.rId) < Number(b.rId);
  });

  return radios1.every((item, index) => {
    return item.id === radios2[index].id;
  });
};

const compareCheckboxes = (checkboxes1, checkboxes2) => {
  if (checkboxes1.length !== checkboxes2.length) {
    return false;
  }
  checkboxes1.sort((a, b) => {
    return Number(a.id) < Number(b.id);
  });
  checkboxes2.sort((a, b) => {
    return Number(a.id) < Number(b.id);
  });

  return checkboxes1.every((item, index) => {
    return item.id === checkboxes2[index].id;
  });
};

/**
 * If dish is new return true
 * If dish not new increment count and return false
 * @param {object} dish
 * @param {object} cart
 * @return {boolean}
 */
const isNewDish = (dish, cart) => {
  const fDish = cart.find((item) => {
    return item.id === dish.id &&
        compareRadios(item.radios, dish.radios) &&
        compareCheckboxes(item.ingredients, dish.ingredients);
  });

  if (fDish) {
    fDish.count += dish.count;
    return false;
  }

  return true;
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

const cartStore = createStoreWithMiddleware(cartReducer, cart);
export default cartStore;
