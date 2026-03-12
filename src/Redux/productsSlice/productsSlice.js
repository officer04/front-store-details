import { createSlice } from '@reduxjs/toolkit';
import { createApiThunk } from '../../utils/createApiThunk';

export const getProductsByCategory = createApiThunk(
  'products/getProductsByCategory',
  'get',
  (categoryId) => `/products/${categoryId}`,
);
export const getCategoryById = createApiThunk(
  'products/getCategoryById',
  'get',
  (categoryId) => `/category/${categoryId}`,
);

const initialState = {
  isLoading: false,
  products: [],
  category: {},
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    change: (state, { payload }) => {
      // const item = state.products.
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsByCategory.pending, (state) => {
      state.isLoading = false;
      state.products = [];
    });
    builder.addCase(getProductsByCategory.fulfilled, (state, { payload }) => {
      state.isLoading = true;
      state.products = payload.data;
    });
    builder.addCase(getCategoryById.pending, (state) => {
      state.category = {};
    });
    builder.addCase(getCategoryById.fulfilled, (state, { payload }) => {
      state.category = payload;
    });
  },
});

export const { change } = productsSlice.actions;

export default productsSlice.reducer;
