import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SignUpPayload, SignUpResponse } from '../types/auth';
import { authApi } from '../api/authApi';
import {
  RequestList,
  RequestStateProperty,
  getErrorMsg,
  makeRequestExtraReducer,
  makeRequestStateProperty,
} from '~/store/helpers';

const SLICE_NAME = 'authSlice';

interface IS {
  signUpRequest: RequestStateProperty<SignUpResponse>;
  isAuth: boolean;
  token: string | null;
}

const initialState: IS = {
  signUpRequest: makeRequestStateProperty<SignUpResponse>(),
  isAuth: false,
  token: null,
};

const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      signUpThunk,
      'signUpRequest',
    );
  },
});

const signUpThunk = createAsyncThunk(
  `${SLICE_NAME}/signUpThunk`,
  async (payload: SignUpPayload, store) => {
    try {
      const token = await authApi.signUp(payload);
      store.dispatch(actions.setToken(token));
      store.dispatch(actions.setIsAuth(true));
      return store.fulfillWithValue(null);
    } catch (e: any) {
      const errors = e?.response?.data?.errors;

      if (errors) {
        const keys = Object.keys(errors);
        const result = keys.map((key) => errors[key].join(', '));
        return store.rejectWithValue(result);
      }

      return store.rejectWithValue(getErrorMsg(e));
    }
  },
);

const signOutThunk = createAsyncThunk(
  `${SLICE_NAME}/signOutThunk`,
  async (_, store) => {
    store.dispatch(actions.setIsAuth(false));
    store.dispatch(actions.setToken(null));
  },
);

export const authSlice = {
  actions,
  reducer,
  thunks: { signUpThunk, signOutThunk },
} as const;
