import { createSlice } from '@reduxjs/toolkit';

import { dropToken } from '../../services/token';
import { AUTH_TOKEN_KEY_NAME } from '../../constants/globalConsts';
import { loginAction } from '../api-actions';

interface CounterState {
  isAuthenticated: boolean;
  isAuthPending: boolean;
  errorMessage: string | null;
}

const initialState: CounterState = {
  isAuthenticated: !!localStorage.getItem(AUTH_TOKEN_KEY_NAME),
  isAuthPending: false,
  errorMessage: null,
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setAuthorized: (state) => {
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      dropToken();
      state.isAuthenticated = false;
      state.errorMessage = null;
      state.isAuthPending = false;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isAuthPending = true;
        state.errorMessage = null;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.isAuthPending = false;
        state.isAuthenticated = true;
        state.errorMessage = null;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isAuthPending = false;
        state.isAuthenticated = false;
        state.errorMessage = action.error.code == 'ERR_BAD_REQUEST' ? 'Неправильный логин или пароль' : null;
      });
  },
});

export const { setAuthorized, logOut, clearErrorMessage } = authorizationSlice.actions;

export default authorizationSlice.reducer;
