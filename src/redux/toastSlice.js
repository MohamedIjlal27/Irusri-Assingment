import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: 'info', // 'info', 'success', 'warning', 'error'
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearToast: (state) => {
      state.message = '';
      state.type = 'info';
    },
  },
});

export const { setToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
