import { createSlice } from '@reduxjs/toolkit';

import { IHelpRequestData } from '../../types/IHelpRequestData';
import { fetchHelpRequestsAction, fetchContributeToRequest, fetchRequestAction } from '../apiActions';

const initialState: IHelpRequestData = {
  helpRequestsList: [],
  isRequestsDataLoading: false,
  hasError: false,
  isContributionPostingStatus: false,
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
        state.isContributionPostingStatus = true;
      })
      .addCase(fetchContributeToRequest.fulfilled, (state) => {
        state.isContributionPostingStatus = false;
      })
      .addCase(fetchContributeToRequest.rejected, (state) => {
        state.isContributionPostingStatus = false;
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
