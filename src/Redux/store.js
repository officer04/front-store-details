import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice/userSlice'
import productsSlice from './productsSlice/productsSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice
  },
})