import { RootState } from '../types';

export const getProfileData = (state: RootState) => {
  return state.profile;
};
