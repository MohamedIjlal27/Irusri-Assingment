import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  users: [], // Add this line to store registered users
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
    },
    login: (state, action) => {
      const user = state.users.find(
        (user) => user.email === action.payload.email && user.password === action.payload.password
      );
      if (user) {
        state.user = user;
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
