import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getErrorMsg,
  makeRequestExtraReducer,
  makeRequestStateProperty,
  RequestList,
  RequestStateProperty,
} from '~/store/helpers';
import { userListApi } from '~/features/userList/api/userListApi';
import { FetchUserListResponse } from '~/features/userList/types/userList';

const SLICE_NAME = 'userListSlice';

interface IS {
  fetchUserListRequest: RequestStateProperty<FetchUserListResponse>;
}

const initialState: IS = {
  fetchUserListRequest: makeRequestStateProperty<FetchUserListResponse>(),
};

const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {},
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      fetchUserListThunk,
      'fetchUserListRequest',
    );
  },
});

interface FetchUserListThunkPayload {
  page: number;
}

const fetchUserListThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchUserListThunk`,
  async ({ page }: FetchUserListThunkPayload, store) => {
    try {
      const res = await userListApi.fetchUserList(page);
      return store.fulfillWithValue(res);
    } catch (e) {
      return store.rejectWithValue(getErrorMsg(e));
    }
  },
);

export const userListSlice = {
  actions,
  reducer,
  thunks: {
    fetchUserListThunk,
  },
} as const;
