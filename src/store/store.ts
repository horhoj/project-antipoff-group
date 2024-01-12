import { configureStore } from '@reduxjs/toolkit';
import { userListSlice } from '~/features/userList/store/userListSlice';
import { userSlice } from '~/features/user/store/userSlice';
import { authSlice } from '~/features/auth/store/authStore';

export const store = configureStore({
  devTools: true,
  reducer: {
    userList: userListSlice.reducer,
    user: userSlice.reducer,
    auth: authSlice.reducer,
  },
});
