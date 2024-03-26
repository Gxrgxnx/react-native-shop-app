import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const cartItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (!cartItem) {
        state.items = [...state.items, { ...action.payload, quantity: 1 }];
      } else {
        state.items = state.items.map((item) => {
          return item.id === cartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }
    },
    removeOneFromCart(state, action) {
      const cartItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (cartItem) {
        if (cartItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id,
          );
        } else {
          state.items = state.items.map((item) => {
            return item.id === cartItem.id
              ? { ...item, quantity: item.quantity - 1 }
              : item;
          });
        }
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, removeFromCart, removeOneFromCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
