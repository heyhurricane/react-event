import { RootState } from '../types';

export const getFavourites = (state: RootState) => {
  return state['favourites'];
};

export const getFavouriteRequestsIDs = (state: RootState) => {
  return state['favourites'].favouriteRequests;
};

export const getIsFavouriteLoading = (state: RootState) => {
  return state['favourites'].isLoading;
};

export const getFavouriteLoadedFlag = (state: RootState) => {
  return state['favourites'].isFavouriteRequestsLoaded;
};

export const getFavouriteRequestsError = (state: RootState) => {
  return state['favourites'].isFavoritesListError;
};
