import { combineReducers } from 'redux'
import { counterReducer } from './reducer'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  counter: counterReducer,
  // остальные редьюсеры
})

export const store = configureStore({
  reducer: rootReducer,
})
