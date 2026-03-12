import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApiThunk } from '../../utils/createApiThunk';
import { getDefaultUser } from '../../utils/getDefaultUser';
import { instance } from '..';

export const login = createApiThunk('user/login', 'post', '/auth/login');
export const registration = createApiThunk('basket/update', 'post', '/auth/registration');
export const updateUser = createApiThunk('user/updateUser', 'patch', '/auth/change');
export const updateProductsBasket = createApiThunk(
  'user/updateProductsBasket',
  'patch',
  '/products-user',
);
export const addProductBasket = createApiThunk('user/addProductBasket', 'post', '/products-user');
export const removeProductBasket = createApiThunk(
  'user/removeProductBasket',
  'delete',
  (productBasketId) => `/category/${productBasketId}`,
);
export const getProductsBasket = createApiThunk('user/getProductsBasket', 'get', '/products-user');
export const resetPasswordRequest = createApiThunk(
  'auth/resetPasswordRequest',
  'post',
  '/auth/reset-password-request',
);
// export const resetPassword = createApiThunk('auth/resetPassword', 'post', (payload) => `/auth/reset-password/${payload.requestId}`); // Не рабочий

export const resetPassword = createAsyncThunk('auth/resetPassword', async (payload, thunkAPI) => {
  try {
    const response = await instance.post(
      `/auth/reset-password/${payload.requestId}`,
      payload.body,
    );
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  user: getDefaultUser(),
  isAuth: !!localStorage.getItem('token'),
  productsBasket: [],
  isLoading: false,
  isLoadingAddBasket: false,
  isLoad: true,
  modal: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.user = payload;
      state.isAuth = true;
    },
    removeAuth: (state, action) => {
      state.isAuth = false;
    },
    toggleModal: (state, { payload }) => {
      state.modal = payload;
    },
    toggleIsAuth: (state, { payload }) => {
      state.isAuth = payload;
    },
    changeBasketCardTotalPrice: (state, { payload }) => {
      const { id } = payload;
      const item = state.productsBasket.data.find((item) => item.productId === id);
      if (item) {
        item.productSum = item.productCount * item.productPrice;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsBasket.pending, (state, action) => {
      state.isLoading = false;
      state.productsBasket = [];
    });
    builder.addCase(getProductsBasket.fulfilled, (state, { payload }) => {
      state.isLoading = true;
      state.productsBasket = payload.data;
    });
    builder.addCase(addProductBasket.pending, (state, { payload }) => {
      state.isLoadingAddBasket = true;
      state.isLoad = false;
      // state.productsBasket = payload
    });
    builder.addCase(addProductBasket.fulfilled, (state, { payload }) => {
      state.isLoadingAddBasket = false;
      state.isLoad = true;
      // state.productsBasket = payload
    });
  },
});

export const {
  addUser,
  removeAuth,
  addLoading,
  toggleModal,
  toggleIsAuth,
  changeBasketCardTotalPrice,
} = userSlice.actions;

export default userSlice.reducer;
