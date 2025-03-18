import { Box, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';
import { getProfileData } from '../../store/userProfile/profileSelectors';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getUserAction } from '../../store/api-actions';
import { useMode } from '../../theme';
import { useViewMode } from '../../hooks/useViewMode';
import { useProfileURLHandler } from '../../hooks/useProfileURLHandler';
import { useResponsiveItemsPerPage } from '../../hooks/useResponsiveItemsPerPage';
import ErrorComponent from '../../components/ErrorComponent';
import CardProfile from '../../components/Profile/CardProfile';
import PersonalData from '../../components/Profile/PersonalData';
import PagesProfile from '../../components/Profile/PagesProfile';
import Contacts from '../../components/Profile/Contacts';
import Favorites from '../../components/Profile/Favorites';
import TabsProfile from '../../components/Profile/element/TabsProfile';
import ViewToggle from '../../components/ViewToggle/ViewToggle';

export default function Profile() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(getProfileData);
  const [numberTab, setNumberTab] = useState(0);
  const [theme] = useMode();
  const { viewMode, handleViewChange } = useViewMode();
  const itemsPerPage = useResponsiveItemsPerPage();

  useProfileURLHandler(numberTab, setNumberTab);

  useEffect(() => {
    if (profile.isData) return;
    dispatch(getUserAction());
  }, []);

  return (
    <Paper sx={{ width: '100%' }}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'}>
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
          {profile.loading && (
            <Box height={'100%'}>
              <Skeleton width={'10rem'} height={'10rem'} />
            </Box>
          )}
          {profile.error && <ErrorComponent />}
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
              <Box
                bgcolor={'white'}
                width={'100%'}
                minHeight={'60vh'}
                border={`1px solid ${theme.palette.grey[300]}`}
                borderRadius={'0.4rem'}
                padding={'0 3rem 4rem 3rem'}
                sx={{
                  [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
                    padding: '0 2rem 4rem 2rem',
                  },
                }}
              >
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  width={'100%'}
                  justifyContent={'space-between'}
                  marginTop={'1.2rem'}
                >
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    width={'100%'}
                    justifyContent={'space-between'}
                    alignItems={'end'}
                  >
                    <Box width={'72%'}>
                      <TabsProfile value={numberTab} setValue={setNumberTab} />
                    </Box>
                    <Box>{numberTab === 2 && <ViewToggle viewMode={viewMode} onOptionChange={handleViewChange} />}</Box>
                  </Box>
                </Box>
                <PagesProfile value={numberTab} index={0}>
                  <PersonalData />
                </PagesProfile>
                <PagesProfile value={numberTab} index={1}>
                  <Contacts />
                </PagesProfile>
                <PagesProfile value={numberTab} index={2}>
                  <Favorites viewMode={viewMode} customNumberItemsPerPage={itemsPerPage} />
                </PagesProfile>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
