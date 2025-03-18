import { createSlice } from '@reduxjs/toolkit';

import { IProfileData } from '../../types/IUser';
import { getUserAction } from '../api-actions';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loading: false,
    isData: false,
    data: <IProfileData>{},
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAction.pending, (state) => {
        state.data = <IProfileData>{};
        state.isData = false;
        state.loading = true;
        state.error = '';
      })
      .addCase(getUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isData = true;
      })
      .addCase(getUserAction.rejected, (state, action) => {
        state.isData = false;
        state.data = <IProfileData>{};
        state.loading = false;
        state.error = String(action.error.message);
      });
  },
});

export default profileSlice.reducer;
