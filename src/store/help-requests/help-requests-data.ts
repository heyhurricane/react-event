import { createSlice } from '@reduxjs/toolkit';

import { HelpRequestData } from '../../types/state';
import { fetchHelpRequestsAction, fetchContributeToRequest, fetchRequestAction } from '../api-actions';

const initialState: HelpRequestData = {
  helpRequestsList: [],
  isRequestsDataLoading: false,
  hasError: false,
  isСontributionPostingStatus: false,
  request: null,
  isRequestDataLoading: true,
  hasHelpRequestError: false,
};

export const helpRequestData = createSlice({
  name: 'HELP_REQUEST',
  initialState: initialState,
  reducers: {
    resetHelpRequestError: (state) => {
      state.hasHelpRequestError = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchHelpRequestsAction.pending, (state) => {
        state.isRequestsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchHelpRequestsAction.fulfilled, (state, action) => {
        state.helpRequestsList = action.payload;
        state.isRequestsDataLoading = false;
      })
      .addCase(fetchHelpRequestsAction.rejected, (state) => {
        state.isRequestsDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchContributeToRequest.pending, (state) => {
        state.isСontributionPostingStatus = true;
      })
      .addCase(fetchContributeToRequest.fulfilled, (state) => {
        state.isСontributionPostingStatus = false;
      })
      .addCase(fetchContributeToRequest.rejected, (state) => {
        state.isСontributionPostingStatus = false;
      })
      .addCase(fetchRequestAction.pending, (state) => {
        state.isRequestDataLoading = true;
        state.hasHelpRequestError = false;
      })
      .addCase(fetchRequestAction.fulfilled, (state, action) => {
        state.request = action.payload;
        state.isRequestDataLoading = false;
        state.hasHelpRequestError = false;
      })
      .addCase(fetchRequestAction.rejected, (state) => {
        state.isRequestDataLoading = false;
        state.hasHelpRequestError = true;
      });
  },
});

export default helpRequestData.reducer;
export const { resetHelpRequestError } = helpRequestData.actions;
