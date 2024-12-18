import FundraisingCard from '../components/FundraisingCard';
import FundraisingForm from '../components/FundraisingForm';
import { CircularProgress, Box, Paper, Typography } from '@mui/material';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRequestAction } from '../store/api-actions';
import { useAppSelector } from '../hooks/useAppSelector';
import { getHelpRequestInfo, getRequestLoadingStatus } from '../store/help-requests/selectors';
import { ErrorComponent } from '../components/Error';
import { useBreakpointOverlap } from '../hooks/useBreakpointOverlap';

const HelpRequest: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const request = useAppSelector(getHelpRequestInfo);
  const isRequestDataLoading = useAppSelector(getRequestLoadingStatus);
  const { isBreakpointOverlap } = useBreakpointOverlap();
  useEffect(() => {
    if (id) {
      dispatch(fetchRequestAction(id));
    }
  }, [id, dispatch]);

  if (isRequestDataLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ padding: '30px 40px', background: '#F5F5F5', width: '100%' }}>
      {!id || !request ? (
        <Box>
          <ErrorComponent />
        </Box>
      ) : (
        <Box>
          <Typography variant="h4" mb={2}>
            Запрос о помощи
          </Typography>
          <Box display="flex" gap={'2rem'} flexDirection={isBreakpointOverlap ? 'column' : 'row'}>
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
