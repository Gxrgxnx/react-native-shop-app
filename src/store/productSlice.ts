import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '../httpClient';
import { Product } from '../types';
import { AppDispatch } from './';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: boolean;
}

const initialState: ProductsState = {
  products: [],
  loading: true,
  error: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsPending(state) {
      state.loading = true;
      state.error = false;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.error = false;
      state.products = [
        ...state.products,
        ...action.payload.filter(
          (newProduct) =>
            !state.products.some(
              (existingProduct) => newProduct.id === existingProduct.id,
            ),
        ),
      ];
    },
    fetchProductsFailure(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const fetchProducts =
  (limit: number, isInitialFetch?: boolean) =>
  async (dispatch: AppDispatch) => {
    if (isInitialFetch) {
      dispatch(fetchProductsPending());
    }

    try {
      const products = await getProducts(limit);
      dispatch(fetchProductsSuccess(products));
    } catch (error) {
      dispatch(fetchProductsFailure());
    }
  };

export const {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
