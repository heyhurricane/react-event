import { FC, useEffect, useState } from 'react';
import { Box, Typography, Grid2, Paper } from '@mui/material';

import Filters from '../components/Filters/Filters';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import HelpRequestsComponent from '../components/HelpRequestsComponent/HelpRequestsComponent';
import FilterButton from '../components/Filters/FilterButton';
import ModalWindow from '../components/ModalWindow/ModalWindow';
import { useMode } from '../theme';
import { useUserHelpRequests } from '../hooks/useUserHelpRequests';
import { useFilters } from '../hooks/useFilters';
import { useResponsiveItemsPerPage } from '../hooks/useResponsiveItemsPerPage';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { resetFavouriteRequestsError } from '../store/userFavourites/userFavouritesSlice';
import useOpenFilterModal from '../hooks/useOpenFilterModal';

const HelpDesk: FC = () => {
  const { helpRequestsList, hasHelpRequests, isHelpRequestsLoading, isHelpRequestsError, isFavouriteRequestsError } =
    useUserHelpRequests();
  const [shouldResetPagination, setShouldResetPagination] = useState(false);

  const dispatch = useAppDispatch();
  const {
    selectedOptions,
    selectedDate,
    searchTerm,
    filteredData,
    setSearchTerm,
    setSelectedOptions,
    setSelectedDate,
  } = useFilters({ helpRequestsList, setShouldResetPagination });

  const { openFilterModal, handleOpenFilterModal, handleCloseFilterModal } = useOpenFilterModal();
  const [theme] = useMode();
  const itemsPerPage = useResponsiveItemsPerPage();

  const dataToDisplay = filteredData ? filteredData : helpRequestsList;
  const noSearchResult = hasHelpRequests && filteredData.length === 0;

  useEffect(() => {
    return () => {
      dispatch(resetFavouriteRequestsError());
    };
  }, [dispatch]);

  return (
    <Paper
      sx={{
        padding: '3rem 4rem',
        background: theme.palette.background.default,
        width: '100%',
        [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
          padding: '2rem 2rem',
        },
      }}
    >
      <Box>
        <Typography variant='h4'>Запросы о помощи</Typography>
        <Grid2 container columnSpacing={3} mt={'1.2rem'}>
          <Box
            sx={{
              display: 'flex',
              [`@media (min-width: ${theme.breakpoints.values.md}px) and (max-width: ${1560}px)`]: {
                width: '22.5%',
                minWidth: '240px',
              },
              [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                display: 'none',
              },
            }}
          >
            <Filters
              selectedOptions={selectedOptions}
              selectedDate={selectedDate}
              setSelectedOptions={setSelectedOptions}
              setSelectedDate={setSelectedDate}
            />
          </Box>
          <Grid2 container size={'grow'} flexDirection={'column'} gap={2}>
            <Grid2 container gap={1}>
              <Box display={'flex'} flexGrow={1}>
                <SearchPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </Box>
              <Box
                sx={{
                  display: 'none',
                  width: 'fitContent',
                  justifyContent: 'center',
                  alignContent: 'center',
                  [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                    display: 'flex',
                  },
                }}
              >
                <FilterButton onClick={handleOpenFilterModal} />
              </Box>
            </Grid2>
            <Paper
              sx={{
                width: '100%',
                minHeight: 'calc(57.35rem - 14.1rem - 1.6rem)',
                padding: '2rem 3rem',
                [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
                  padding: '2rem 1.6rem',
                },
              }}
            >
              <HelpRequestsComponent
                helpRequests={dataToDisplay}
                customNumberItemsPerPage={itemsPerPage}
                noSearchResult={noSearchResult}
                setShouldResetPagination={setShouldResetPagination}
                isFavouriteRequestsError={isFavouriteRequestsError}
                isHelpRequestsError={isHelpRequestsError}
                isLoading={isHelpRequestsLoading}
                shouldResetPagination={shouldResetPagination}
              />
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
      <ModalWindow
        openFilterModal={openFilterModal}
        handleCloseFilterModal={handleCloseFilterModal}
        slideDirection={'left'}
      >
        <Filters
          selectedOptions={selectedOptions}
          selectedDate={selectedDate}
          setSelectedOptions={setSelectedOptions}
          setSelectedDate={setSelectedDate}
        />
      </ModalWindow>
    </Paper>
  );
};

export default HelpDesk;
