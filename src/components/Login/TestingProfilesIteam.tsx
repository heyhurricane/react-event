import { Box, Card, CardContent, Typography } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import { setPassword, setLogin, setIsPasswordValid, setIsLoginValid } from '../../store/formAuthorization';
import { AppDispatch } from '../../store/types';
import { useValidation } from '../../hooks/useValidation';
import { clearErrorMessage } from '../../store/authorization';

export function TestingProfilesIteam({ user }) {
  const dispatch = useDispatch<AppDispatch>();
  const { validateLogin, validatePassword } = useValidation();
  
  return (
    <Card
      variant='outlined'
      onClick={() => {
        dispatch(setLogin(user.login));
        dispatch(setPassword(user.password));
        const isLoginValid = validateLogin(user.login);
        const isPasswordValid = validatePassword(user.password);
        dispatch(setIsLoginValid(isLoginValid));
        dispatch(setIsPasswordValid(isPasswordValid));
        dispatch(clearErrorMessage());
      }}
      sx={{
        borderColor: '#1976d2',
        borderWidth: 1,
        borderRadius: 2,
        marginBottom: 2,
        cursor: 'pointer',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex' }}>
          <InfoOutlined color='primary' sx={{ mr: 1 }} />
          <Box
            sx={{
              display: 'flex',
              marginBottom: '1',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>{user.name}</Typography>

            <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>Логин: {user.login}</Typography>
            <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>Пароль: {user.password}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
