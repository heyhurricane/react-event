import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { useMode } from '../../theme';

export default function LogInButton() {
  const [theme] = useMode();
  return (
    <Box
      sx={{
        width: '220px',
        height: '40px',
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
          width: '122px',
          height: '40px',
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
}
