import { useCallback, useEffect } from 'react';

import { VIEW_TOGGLE_OPTIONS } from '../constants/globalConsts';
import { getViewMode } from '../store/viewMode/viewSettingsSelectors';
import { setViewMode } from '../store/viewMode/viewSettingsSlice';

import { useBreakpointOverlap } from './useBreakpointOverlap';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export function useViewMode() {
  const viewMode = useAppSelector(getViewMode);
  const { isBreakpointOverlap } = useBreakpointOverlap({ breakpointOverlapValue: 675 });
  const dispatch = useAppDispatch();

  const handleViewChange = useCallback(
    (newViewMode: VIEW_TOGGLE_OPTIONS) => {
      dispatch(setViewMode(newViewMode));
    },
    [dispatch],
  );

  const resetViewMode = () => {
    handleViewChange(VIEW_TOGGLE_OPTIONS.Grid);
  };

  useEffect(() => {
    if (isBreakpointOverlap) handleViewChange(VIEW_TOGGLE_OPTIONS.Grid);
  }, [isBreakpointOverlap, handleViewChange]);

  return { viewMode, handleViewChange, resetViewMode };
}
