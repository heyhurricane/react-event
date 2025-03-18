import { RootState } from '../types';

export const getAuthError = (state: RootState): string | null => state.auth.errorMessage;
