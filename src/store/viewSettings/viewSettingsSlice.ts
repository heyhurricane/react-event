import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { VIEW_TOGGLE_OPTIONS } from '../../constants/globalConsts';

export const viewSettings = createSlice({
  name: 'viewSettings',
  initialState: {
    viewMode: VIEW_TOGGLE_OPTIONS.Grid,
    tabProfile: <number>0,
  },
  reducers: {
    setViewMode: (state, action: PayloadAction<VIEW_TOGGLE_OPTIONS>) => {
      state.viewMode = action.payload;
    },
    setTabProfile: (state, action: PayloadAction<number>) => {
      state.tabProfile = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default viewSettings.reducer;
export const { setViewMode, setTabProfile } = viewSettings.actions;
