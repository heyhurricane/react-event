import { Action, combineReducers, Middleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { createAPI } from '../services/api';

import authorizationReducer, { logOut } from './authorization/authorizationSlice';
import userFavouritesReducer from './userFavourites/userFavouritesSlice';
import profileReducer from './userProfile/profileSlice';
import formAuthorizationReducer from './authorizationForm/authorizationFormSlice';
import { helpRequestData } from './helpRequests/helpRequestsSlice';
import viewSettingsReducer from './viewSettings/viewSettingsSlice';

const rootReducer = combineReducers({
  auth: authorizationReducer,
  formAuthorization: formAuthorizationReducer,
  profile: profileReducer,
  favourites: userFavouritesReducer,
  HELP_REQUEST: helpRequestData.reducer,
  viewSettings: viewSettingsReducer,
});

interface IActionWithError extends Action {
  error?: {
    name: string;
    message: string;
  };
}

type RootState = ReturnType<typeof rootReducer>;

// задавили линтер по необходимости согласно инструкции редакса https://redux.js.org/usage/usage-with-typescript
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const authMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const typedAction = action as IActionWithError;

  if (
    typedAction.type.endsWith('rejected') &&
    typedAction.error?.name === 'AxiosError' &&
    typedAction.error?.message.includes('403')
  ) {
    store.dispatch(logOut());
  }

  return next(action);
};

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(authMiddleware),
  devTools: true,
});
