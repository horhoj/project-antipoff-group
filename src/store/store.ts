import { configureStore } from '@reduxjs/toolkit';
import { userListSlice } from '~/features/userList/store/userListSlice';
import { userSlice } from '~/features/user/store/userSlice';

export const store = configureStore({
  devTools: true,
  reducer: {
    userList: userListSlice.reducer,
    user: userSlice.reducer,
  },
});
