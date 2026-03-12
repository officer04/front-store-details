import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from './../Redux/index';

export const createApiThunk = (typePrefix, method, urlOrFn) => {
  return createAsyncThunk(typePrefix, async (data, thunkAPI) => {
    try {
      let url;
      if (typeof urlOrFn === 'function') {
        url = urlOrFn(data);
      } else {
        url = urlOrFn;
      }

      let response;
      if (method === 'get' || method === 'delete') {
        const params = data && typeof data === 'object' && !Array.isArray(data) ? data : {};
        response = await instance[method](url, { params });
      } else {
        response = await instance[method](url, data);
      }
      return response;
    } catch (error) {
      console.error(`Ошибка в ${typePrefix}:`, error);
      // const message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(error);
    }
  });
};
