import { createSlice } from '@reduxjs/toolkit';

import { dropToken } from '../services/token';
import { AUTH_TOKEN_KEY_NAME } from '../const/const';

import { loginAction } from './api-actions';

// Define a type for the slice state
interface CounterState {
  isAuthenticated: boolean;
  isAuthPending: boolean;
  errorMessage: string | null; // Добавляем поле для хранения сообщения об ошибке
}

// Define the initial state using that type
const initialState: CounterState = {
  isAuthenticated: !!localStorage.getItem(AUTH_TOKEN_KEY_NAME),
  isAuthPending: false,
  errorMessage: null, // Изначально ошибка отсутствует
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuthorized: (state) => {
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      dropToken();
      state.isAuthenticated = false;
      state.errorMessage = null; // Сбрасываем сообщение об ошибке при выходе
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
        state.errorMessage = null; // Сбрасываем сообщение об ошибке при новом запросе
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.isAuthPending = false;
        state.isAuthenticated = true;
        state.errorMessage = null; // Сбрасываем сообщение об ошибке при успешной аутентификации
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
