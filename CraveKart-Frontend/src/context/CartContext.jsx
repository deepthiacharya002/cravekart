import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalItems: 0,
  favoriteItems: [],
  orderHistory: [],
  userPreferences: {
    theme: 'light',
    defaultAddress: null,
    paymentMethod: 'cash'
  }
};

// Action types
export const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  ADD_TO_ORDER_HISTORY: 'ADD_TO_ORDER_HISTORY',
  UPDATE_USER_PREFERENCES: 'UPDATE_USER_PREFERENCES',
  LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE'
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { item, quantity = 1 } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        cartItem => cartItem.name === item.name
      );

      let updatedCartItems;
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        updatedCartItems = state.cartItems.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        // New item, add to cart
        updatedCartItems = [...state.cartItems, { ...item, quantity }];
      }

      const totalAmount = updatedCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const totalItems = updatedCartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount,
        totalItems
      };
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      const { itemName } = action.payload;
      const updatedCartItems = state.cartItems.filter(
        item => item.name !== itemName
      );

      const totalAmount = updatedCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const totalItems = updatedCartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount,
        totalItems
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemName, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, {
          type: CART_ACTIONS.REMOVE_FROM_CART,
          payload: { itemName }
        });
      }

      const updatedCartItems = state.cartItems.map(item =>
        item.name === itemName ? { ...item, quantity } : item
      );

      const totalAmount = updatedCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const totalItems = updatedCartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount,
        totalItems
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        totalAmount: 0,
        totalItems: 0
      };

    case CART_ACTIONS.ADD_TO_FAVORITES: {
      const { item } = action.payload;
      const isAlreadyFavorite = state.favoriteItems.some(
        fav => fav.name === item.name
      );

      if (isAlreadyFavorite) return state;

      return {
        ...state,
        favoriteItems: [...state.favoriteItems, item]
      };
    }

    case CART_ACTIONS.REMOVE_FROM_FAVORITES: {
      const { itemName } = action.payload;
      return {
        ...state,
        favoriteItems: state.favoriteItems.filter(
          item => item.name !== itemName
        )
      };
    }

    case CART_ACTIONS.ADD_TO_ORDER_HISTORY: {
      const { order } = action.payload;
      return {
        ...state,
        orderHistory: [order, ...state.orderHistory]
      };
    }

    case CART_ACTIONS.UPDATE_USER_PREFERENCES: {
      const { preferences } = action.payload;
      return {
        ...state,
        userPreferences: { ...state.userPreferences, ...preferences }
      };
    }

    case CART_ACTIONS.LOAD_FROM_STORAGE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

// Create contexts
const CartContext = createContext();
const CartDispatchContext = createContext();

// Custom hooks
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const useCartDispatch = () => {
  const context = useContext(CartDispatchContext);
  if (!context) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      // Clear localStorage for testing
      // localStorage.removeItem('craveKartData');
      
      const savedData = localStorage.getItem('craveKartData');
      console.log('Loading data from localStorage:', savedData);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log('Parsed data:', parsedData);
        dispatch({
          type: CART_ACTIONS.LOAD_FROM_STORAGE,
          payload: parsedData
        });
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    try {
      console.log('Saving state to localStorage:', state);
      localStorage.setItem('craveKartData', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [state]);

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};
