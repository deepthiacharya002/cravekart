// Helper functions for common cart operations
export const cartHelpers = {
  addToCart: (dispatch, item, quantity = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { item, quantity }
    });
  },

  removeFromCart: (dispatch, itemName) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { itemName }
    });
  },

  updateQuantity: (dispatch, itemName, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { itemName, quantity }
    });
  },

  clearCart: (dispatch) => {
    dispatch({ type: 'CLEAR_CART' });
  },

  addToFavorites: (dispatch, item) => {
    dispatch({
      type: 'ADD_TO_FAVORITES',
      payload: { item }
    });
  },

  removeFromFavorites: (dispatch, itemName) => {
    dispatch({
      type: 'REMOVE_FROM_FAVORITES',
      payload: { itemName }
    });
  },

  addToOrderHistory: (dispatch, order) => {
    dispatch({
      type: 'ADD_TO_ORDER_HISTORY',
      payload: { order }
    });
  },

  updateUserPreferences: (dispatch, preferences) => {
    dispatch({
      type: 'UPDATE_USER_PREFERENCES',
      payload: { preferences }
    });
  }
};
