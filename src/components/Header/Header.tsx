import { AppBar, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '../../const/const';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useMode } from '../../theme';

import LogInButton from './LogInButton';
import ImageAvatar from './Avatar';
import { Logo } from './Logo';

export default function HeaderNavigationApp() {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);

  const handleClickRequest = () => {
    navigate(AppRoute.Main, { replace: true });
  };
  const [theme] = useMode();
  return (
    <Box
      bgcolor={theme.palette.background.default}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <AppBar position='static' color='inherit' sx={{ zIndex: '1' }}>
        <Box
          sx={{
            width: '100%',
            padding: '0 calc(8.1rem + 0.109375 * (100vw - 192rem))',
            height: '64px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 'none',
            paddingRight: 'none',
            [`@media (max-width:${theme.breakpoints.values.lg}px)`]: {
              padding: '0 7rem',
            },
            [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
              padding: '0 2rem',
            },
          }}
        >
          <Logo />
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Link
              onClick={handleClickRequest}
              color='inherit'
              underline='hover'
              sx={{
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0.15px',
                cursor: 'pointer',
              }}
            >
              Запросы о помощи
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
                width: 'calc(31.3rem + 0.11*(100vw - 192rem))',
              },
            }}
          >
            {isAuthenticated ? <ImageAvatar /> : <LogInButton />}
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
}
