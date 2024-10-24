import {
  CounterActionTypes,
  DECREMENT,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  INCREMENT,
} from './actions'

export interface User {
  id: number
  name: string
  username: string
}

export type TCounterState = {
  counter: number
  users: ReadonlyArray<User>
  loading: boolean
}

const initialState: TCounterState = {
  counter: 0,
  users: [],
  loading: false,
}

export const counterReducer = (
  state = initialState,
  action: CounterActionTypes
): TCounterState => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1 }
    case DECREMENT:
      return { ...state, counter: state.counter - 1 }
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true }
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false }
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      }
    default:
      return state
  }
}
