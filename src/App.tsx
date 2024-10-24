import './App.css'
import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { increment, decrement } from './store/actions'
import { fetchData } from './store/async_action'
import { useAppDispatch, useAppSelector } from './hooks/useTypedRedux'

function App() {
  const counter = useAppSelector((state) => state.counter.counter)
  const list = useAppSelector((state) => state.counter.users)
  const loading = useAppSelector((state) => state.counter.loading)

  const dispatch = useAppDispatch()

  const requestUsersHandler = () => {
    dispatch(fetchData())
  }

  return (
    <>
      <h1>Counter: {counter}</h1>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      </ButtonGroup>

      <Box sx={{ m: 2 }}>
        <Button variant="contained" onClick={requestUsersHandler}>
          Запросить данные
        </Button>
        <List>
          {list.length > 0 &&
            !loading &&
            list.map((item) => {
              return (
                <ListItem key={item.id}>
                  <ListItemText>{item.name}</ListItemText>
                </ListItem>
              )
            })}
        </List>
      </Box>
    </>
  )
}

export default App
