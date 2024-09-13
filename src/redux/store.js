import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import todoReducer from './todoSlice';
import toastReducer from './toastSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
    toast: toastReducer,
  },
});

export default store;
