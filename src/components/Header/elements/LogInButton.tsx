import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { useMode } from '../../../theme';

const LogInButton = () => {
  const [theme] = useMode();

  return (
    <Box
      sx={{
        width: '22rem',
        height: '4rem',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
          width: '100%',
        },
      }}
    >
      <Button
        variant='outlined'
        color='inherit'
        sx={{
          width: '12.2rem',
          height: '4rem',
          [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
            width: '4.5rem',
            fontSize: '1.1rem',
            marginLeft: '0.5rem',
          },
        }}
        component={Link}
        to='/login'
      >
        ВОЙТИ &gt;
      </Button>
    </Box>
  );
};

export default LogInButton;
