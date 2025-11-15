import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { Arttoy } from '@/types/arttoy.types';

export interface OrderItem {
  id: string; // Order item ID
  artToyId: string;
  artToy: Arttoy;
  amount: number; // Quantity (1-5)
  addedAt: string;
}

export interface OrderState {
  items: OrderItem[];
  orderId: string | null;
  maxItems: number;
}

const initialState: OrderState = {
  items: [],
  orderId: null,
  maxItems: 5,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToOrder: (
      state,
      action: PayloadAction<{ artToy: Arttoy; amount: number }>,
    ) => {
      // Check if already at max items
      if (state.items.length >= state.maxItems) {
        return;
      }

      // Check if art toy already exists in order
      const existingItem = state.items.find(
        (item) => item.artToyId === action.payload.artToy._id,
      );

      if (existingItem) {
        // Already in cart, don't add again
        return;
      }

      // Create order ID if it doesn't exist
      if (!state.orderId) {
        state.orderId = uuidv4();
      }

      // Add new item
      const orderItem: OrderItem = {
        id: uuidv4(),
        artToyId: action.payload.artToy._id,
        artToy: action.payload.artToy,
        amount: action.payload.amount,
        addedAt: new Date().toISOString(),
      };

      state.items.push(orderItem);
    },

    updateOrderAmount: (
      state,
      action: PayloadAction<{ id: string; amount: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.amount = Math.min(Math.max(action.payload.amount, 1), 5);
      }
    },

    removeFromOrder: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Clear order ID if no items left
      if (state.items.length === 0) {
        state.orderId = null;
      }
    },

    clearOrder: (state) => {
      state.items = [];
      state.orderId = null;
    },

    submitOrder: (state) => {
      // This will be handled by API call, but we clear the state after successful submission
      state.items = [];
      state.orderId = null;
    },
  },
});

export const {
  addToOrder,
  removeFromOrder,
  clearOrder,
  submitOrder,
  updateOrderAmount,
} = orderSlice.actions;

export default orderSlice.reducer;
