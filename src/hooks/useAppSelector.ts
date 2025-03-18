import { useSelector } from 'react-redux';

import type { RootState } from '../store/types';

export const useAppSelector = useSelector.withTypes<RootState>();
