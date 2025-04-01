import { Box, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { FC, useEffect } from 'react';

import { useAppSelector } from '../hooks/useAppSelector';
import { getProfileData } from '../store/userProfile/profileSelectors';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getUserAction } from '../store/apiActions';
import { useMode } from '../theme';
import { useProfileURLHandler } from '../hooks/useProfileURLHandler';
import Error from '../components/Status/Error';
import CardProfile from '../components/Profile/CardProfile';
import { getTabProfile } from '../store/viewSettings/viewSettingsSelectors';
import { setTabProfile } from '../store/viewSettings/viewSettingsSlice';
import TabsPropfile from '../components/Profile/TabsPropfile';
import Loading from '../components/Status/Loading';

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(getProfileData);
  const [theme] = useMode();

  const numberTab = useAppSelector(getTabProfile);
  const setNumberTab = (numberTab: number) => {
    dispatch(setTabProfile(numberTab));
  };

  useProfileURLHandler(numberTab, setNumberTab);

  useEffect(() => {
    if (profile.isData) return;
    dispatch(getUserAction());
  }, []);

  return (
    <Paper sx={{ width: '100%' }}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'} height={'100%'}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          width={'100%'}
          height={'100%'}
          padding={'3rem 4rem'}
          bgcolor={theme.palette.background.default}
          sx={{
            [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
              padding: '2rem 2rem',
            },
          }}
        >
          <Stack alignItems={'flex-start'}>
            <Typography variant='h4'>Мой профиль</Typography>
          </Stack>
          {profile.loading && <Loading />}
          {profile.error && <Error />}
          {profile.isData && (
            <Box
              display={'flex'}
              flexDirection={'row'}
              gap={'2rem'}
              marginTop={'1.2rem'}
              sx={{
                [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                  flexDirection: 'column',
                  gap: '1rem',
                },
              }}
            >
              <Stack
                bgcolor={'white'}
                borderRadius={'0.4rem'}
                border={`1px solid ${theme.palette.grey[300]}`}
                height={'fit-content'}
                sx={{
                  [`@media (min-width: ${theme.breakpoints.values.md}px) and (max-width: ${1560}px)`]: {
                    width: '22.5%',
                    minWidth: '24rem',
                  },
                  [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                    width: '100%',
                    minWidth: 'none',
                  },
                }}
              >
                <CardProfile />
              </Stack>
              <TabsPropfile />
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default Profile;
