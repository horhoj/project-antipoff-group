import { configureStore } from '@reduxjs/toolkit';
import { userListSlice } from '~/features/userList/store/userListSlice';

export const store = configureStore({
  devTools: true,
  reducer: {
    userList: userListSlice.reducer,
  },
});
