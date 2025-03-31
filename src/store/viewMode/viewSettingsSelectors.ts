import { RootState } from '../types';

export const getViewMode = (state: RootState) => state.viewSettings.viewMode;
export const getTabProfile = (state: RootState) => state.viewSettings.tabProfile;
