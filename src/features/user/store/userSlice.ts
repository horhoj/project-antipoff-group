import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getErrorMsg,
  makeRequestExtraReducer,
  makeRequestStateProperty,
  RequestList,
  RequestStateProperty,
} from '~/store/helpers';
import { userApi } from '~/features/user/api/userApi';
import { FetchUserResponse } from '~/features/user/types/user';

const SLICE_NAME = 'userSlice';

interface IS {
  fetchUserRequest: RequestStateProperty<FetchUserResponse>;
}

const initialState: IS = {
  fetchUserRequest: makeRequestStateProperty<FetchUserResponse>(),
};

const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: { clear: () => initialState },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      fetchUserThunk,
      'fetchUserRequest',
    );
  },
});

interface FetchUserThunkPayload {
  id: number;
}

const fetchUserThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchUserThunk`,
  async ({ id }: FetchUserThunkPayload, store) => {
    try {
      const res = await userApi.fetchUser(id);
      return store.fulfillWithValue(res);
    } catch (e) {
      return store.rejectWithValue(getErrorMsg(e));
    }
  },
);

export const userSlice = {
  actions,
  reducer,
  thunks: { fetchUserThunk },
} as const;
