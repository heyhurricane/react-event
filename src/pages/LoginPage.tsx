import { Box, Divider } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/useAppSelector';
import { AppRoute } from '../const/const';
import { useMode } from '../theme';
import { Authorization } from '../components/Login/Authorization';
import { useBreakpointOverlap } from '../hooks/useBreakpointOverlap';
import TestingProfiles from '../components/Login/TestingProfiles';
import TestingProfilesSM from '../components/Login/TestingProfilesSM';

const LoginPage = () => {
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);
  const { isBreakpointOverlap } = useBreakpointOverlap();
  const [theme] = useMode();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(AppRoute.Main, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      width={'100%'}
      display={'flex'}
      borderLeft={`1px solid ${theme.palette.grey[300]}`}
      borderRight={`1px solid ${theme.palette.grey[300]}`}
      sx={{
        [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
          flexDirection: 'column',
        },
      }}
    >
      <Authorization />
      <Box>
        <Divider
          orientation='vertical'
          sx={{
            [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
              opacity: 0,
            },
          }}
        />
        <Divider
          orientation='horizontal'
          sx={{
            [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
              opacity: 1,
            },
          }}
        />
      </Box>
      {isBreakpointOverlap ? <TestingProfilesSM /> : <TestingProfiles />}
    </Box>
  );
};

export default LoginPage;
