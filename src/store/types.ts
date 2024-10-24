import { store } from './index'
import { ThunkAction } from 'redux-thunk'
import { CounterActionTypes } from './actions'

// cюда добавить еще типы если понадобится через |
type TApplicationActions = CounterActionTypes

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, // Возвращаемое значение (например, void)
  RootState, // Тип состояния
  unknown, // Дополнительный аргумент (может быть `unknown`, если не используется)
  TApplicationActions // Тип действия (экшенов)
>

export type AppStore = typeof store
