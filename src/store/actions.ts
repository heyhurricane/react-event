import { User } from './reducer'

interface IncrementAction {
  type: typeof INCREMENT
}

interface DecrementAction {
  type: typeof DECREMENT
}

interface FetchDataRequestAction {
  type: typeof FETCH_DATA_REQUEST
}

interface FetchDataSuccessAction {
  type: typeof FETCH_DATA_SUCCESS
  payload: User[]
}

interface FetchDataFailureAction {
  type: typeof FETCH_DATA_FAILURE
  error: string
}

export type CounterActionTypes =
  | IncrementAction
  | DecrementAction
  | FetchDataRequestAction
  | FetchDataSuccessAction
  | FetchDataFailureAction

// ниже это экшены
// лучше их вынести в переменные, чтобы не попутать написание в редьюсере и экшен криэторе

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'

// ниже это все синхронные экшен креэйторы
// они нам нужны, чтобы диспатчить их уже после обработки асинхронного запроса

export const increment = (): IncrementAction => {
  return {
    type: INCREMENT,
  }
}

export const decrement = (): DecrementAction => {
  return {
    type: DECREMENT,
  }
}

export const fetchDataRequest = (): FetchDataRequestAction => {
  return {
    type: FETCH_DATA_REQUEST,
  }
}

export const fetchDataSuccess = (payload: User[]): FetchDataSuccessAction => ({
  type: FETCH_DATA_SUCCESS,
  payload,
})

export const fetchDataFailure = (error: string): FetchDataFailureAction => {
  return {
    type: FETCH_DATA_FAILURE,
    error,
  }
}
