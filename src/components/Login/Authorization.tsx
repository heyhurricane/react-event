import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';

import { useMode } from '../../theme';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useValidation } from '../../hooks/useValidation';
import { loginAction } from '../../store/api-actions';
import {
  setPassword,
  setLogin,
  setIsPasswordValid,
  setIsLoginValid,
} from '../../store/authorization/authorizationFormSlice';
import { AuthData } from '../../types/auth-data';
import { getAuthError } from '../../store/authorization/authorizationSelectors';
import { clearErrorMessage } from '../../store/authorization/authorizationSlice';

export function Authorization() {
  const errorMessage = useAppSelector(getAuthError);
  const dispatch = useAppDispatch();
  const { login, password } = useAppSelector((state) => state.formAuthorization);
  const isLoginValid = useAppSelector((state) => state.formAuthorization.isLoginValid);
  const isPasswordValid = useAppSelector((state) => state.formAuthorization.isPasswordValid);
  const { validateLogin, validatePassword } = useValidation();

  const [showPassword, setShowPassword] = useState(false);

  const [theme] = useMode();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const handleInputPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    dispatch(setPassword(passwordValue));
    dispatch(setIsPasswordValid(validatePassword(passwordValue)));
    dispatch(clearErrorMessage());
  };

  const handleInputLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    dispatch(setLogin(email));
    dispatch(setIsLoginValid(validateLogin(email)));
    dispatch(clearErrorMessage());
  };

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleFormSubmit = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (isLoginValid && isPasswordValid) {
      onSubmit({ login, password });
    }
  };

  useEffect(() => {}, [validateLogin]);

  return (
    <Box
      display='flex'
      width='100%'
      sx={{
        [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
          justifyContent: 'center',
        },
      }}
    >
      <Box
        display='flex'
        flexDirection='column'
        maxWidth='48rem'
        marginLeft='4rem'
        marginRight='2rem'
        marginTop='6.4rem'
        sx={{
          flexDirection: 'column',
          [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
            marginLeft: '0',
            marginBottom: '4rem',
          },
        }}
      >
        <Typography variant='h4'>Авторизация</Typography>
        <Typography variant='h5' sx={{ marginTop: '9rem', marginBottom: '3.5rem' }}>
          Вход
        </Typography>

        <Box display='flex' flexDirection='column' gap='3rem'>
          <FormControl>
            <TextField
              label='Логин'
              variant='outlined'
              value={login}
              onChange={handleInputLoginChange}
              error={!isLoginValid || !!errorMessage}
              helperText={!isLoginValid ? 'Введите корректный email-адрес' : errorMessage}
            />
          </FormControl>

          <FormControl error={!isPasswordValid || !!errorMessage}>
            <InputLabel htmlFor='outlined-adornment-password'>Пароль</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleInputPasswordChange}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Пароль'
            />
            {(!isPasswordValid || errorMessage) && (
              <Typography color='error' variant='caption'>
                {!isPasswordValid ? 'Пароль не менее 5 символов' : errorMessage}
              </Typography>
            )}
          </FormControl>
        </Box>

        <Button
          variant='contained'
          onClick={handleFormSubmit}
          sx={{ marginTop: '4rem' }}
          disabled={!login || !password || !isLoginValid || !isPasswordValid}
        >
          Войти
        </Button>
      </Box>
    </Box>
  );
}
