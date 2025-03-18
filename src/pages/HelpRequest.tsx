import { CircularProgress, Box, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useBreakpointOverlap } from '../hooks/useBreakpointOverlap';
import FundraisingCard from '../components/FundraisingCard';
import FundraisingForm from '../components/FundraisingForm';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchRequestAction, getFavouritesAction } from '../store/api-actions';
import { useAppSelector } from '../hooks/useAppSelector';
import { getHelpRequestError, getHelpRequestInfo, getRequestLoadingStatus } from '../store/help-requests/selectors';
import ErrorComponent from '../components/ErrorComponent';
import { getFavouriteLoadedFlag, getFavouriteRequestsError } from '../store/user-favourites/favourites-selectors';
import { resetFavouriteRequestsError } from '../store/user-favourites/userFavourites';
import { resetHelpRequestError } from '../store/help-requests/help-requests-data';

const HelpRequest: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const request = useAppSelector(getHelpRequestInfo);
  const isRequestDataLoading = useAppSelector(getRequestLoadingStatus);
  const favouriteRequestsFlag = useAppSelector(getFavouriteLoadedFlag);
  const { isBreakpointOverlap } = useBreakpointOverlap();
  const isFavouriteRequestsError = useAppSelector(getFavouriteRequestsError);
  const isRequestDataError = useAppSelector(getHelpRequestError);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          await dispatch(fetchRequestAction(id)).unwrap();
          if (!favouriteRequestsFlag) {
            await dispatch(getFavouritesAction()).unwrap();
          }
        } catch (error) {
          console.error('Ошибка загрузки данных:', error);
        }
      }
    };

    fetchData();
  }, [id, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetHelpRequestError());
      dispatch(resetFavouriteRequestsError());
    };
  }, [dispatch]);

  if ((isRequestDataLoading || !favouriteRequestsFlag) && !isFavouriteRequestsError) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ padding: '30px 40px', background: '#F5F5F5', width: '100%' }}>
      {!id || !request || isRequestDataError || isFavouriteRequestsError ? (
        <Box>
          <ErrorComponent />
        </Box>
      ) : (
        <Box>
          <Typography variant='h4' mb={2}>
            Запрос о помощи
          </Typography>
          <Box display='flex' gap={'2rem'} flexDirection={isBreakpointOverlap ? 'column' : 'row'}>
            <Box width={isBreakpointOverlap ? '100%' : '80%'} order={isBreakpointOverlap ? 2 : 1}>
              <FundraisingForm helpRequest={request} />
            </Box>

            <Box height={'fit-content'} order={isBreakpointOverlap ? 1 : 2}>
              <FundraisingCard helpRequest={request} />
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default HelpRequest;
