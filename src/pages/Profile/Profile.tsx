import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserAction } from '../../store/api-actions';
import { AppDispatch, RootState } from '../../store/types';
import { ErrorComponent } from '../../components/Error';
import CardProfile from '../../components/Profile/CardProfile';
import PersonalData from '../../components/Profile/PersonalData';
import PagesProfile from '../../components/Profile/PagesProfile';
import Contacts from '../../components/Profile/Contacts';
import Favorites from '../../components/Profile/Favorites';
import { useMode } from '../../theme';
import { TabsProfile } from '../../components/Profile/element/TabsProfile';
import ViewToggle from '../../components/ViewToggle/ViewToggle';
import { useViewMode } from '../../hooks/useViewMode';
import useResponsiveItemsPerPage from '../../hooks/useResponsiveItemsPerPage';
import { deleteParametersURL } from '../../hooks/useParseURL';

export default function Profile() {
  const [numberTab, setNumberTab] = useState(0);
  const [isURLParsingEnabled, setIsURLParsingEnabled] = useState<boolean>(numberTab === 2);
  const [theme] = useMode();
  const dispatch = useDispatch<AppDispatch>();
  const { viewMode, handleViewChange } = useViewMode();
  const itemsPerPage = useResponsiveItemsPerPage();
  const profile = useSelector((state: RootState) => {
    return state.profile;
  });

  const params = new URLSearchParams(location.search);
  const urlCurrentPage = parseInt(params.get('currentPage') || '1', 10);
  if (isURLParsingEnabled === false) deleteParametersURL();

  useEffect(() => {
    setIsURLParsingEnabled(numberTab === 2);
  }, [numberTab]);

  useEffect(() => {
    if (urlCurrentPage > 1) {
      setNumberTab(2);
    }
  }, []);

  useEffect(() => {
    if (profile.isData) return;
    dispatch(getUserAction());
  }, []);

  return (
    <Box display='flex' flexDirection={'column'} alignItems={'center'} width={'100%'}>
      <Box
        height={'100%'}
        width={'100%'}
        display='flex'
        flexDirection={'column'}
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
            <Skeleton width={'100px'} height={'100px'} />
          </Box>
        )}
        {profile.error && <ErrorComponent />}
        {profile.isData && (
          <Box
            display='flex'
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
              borderRadius={'4px'}
              border={`1px solid ${theme.palette.grey[300]}`}
              height={'fit-content'}
              sx={{
                [`@media (min-width: ${theme.breakpoints.values.md}px) and (max-width: ${1560}px)`]: {
                  width: '22.5%',
                  minWidth: '240px',
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
              padding={'0 3rem 4rem 3rem'}
              borderRadius={'4px'}
              border={`1px solid ${theme.palette.grey[300]}`}
              width={'100%'}
              minHeight={'60vh'}
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
                marginTop={'12px'}
              >
                <Box width={'72%'}>
                  <TabsProfile value={numberTab} setValue={setNumberTab} />
                </Box>
                {numberTab === 2 && <ViewToggle viewMode={viewMode} onOptionChange={handleViewChange} />}
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
  );
}
