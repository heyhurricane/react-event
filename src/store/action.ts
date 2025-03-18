import { createAction } from '@reduxjs/toolkit';

import { AppRoute } from '../constants/globalConsts';

export const redirectToRoute = createAction<AppRoute>('game/redirectToRoute');
