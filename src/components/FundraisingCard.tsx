import { Box, Button, LinearProgress, Paper, Typography } from '@mui/material';
import { FC } from 'react';

import { formatDate, formatNumber } from '../utils/formatUtils';
import useContributeToRequest from '../hooks/useContributeToRequest';
import { HelpRequest } from '../types/HelpRequest';
import { useMode } from '../theme';
import { useBreakpointOverlap } from '../hooks/useBreakpointOverlap';

type RequestProps = {
  helpRequest: HelpRequest;
};

const FundraisingCard: FC<RequestProps> = ({ helpRequest }) => {
  const { goalDescription, endingDate, contributorsCount, requestGoalCurrentValue, requestGoal } = helpRequest;
  const { handleContributeToRequest } = useContributeToRequest(helpRequest);
  const [theme] = useMode();
  const breakpointOverlap = theme.breakpoints.values.sm;
  const { isBreakpointOverlap } = useBreakpointOverlap({
    breakpointOverlapExpression: () => window.innerWidth <= breakpointOverlap && window.innerWidth >= 360,
  });

  return (
    <Paper sx={{ padding: '1.5rem' }}>
      <Typography variant='h6' sx={{ fontWeight: 'bold' }} mb={'10px'}>
        Вместе для добрых дел
      </Typography>
      <Box
        display={'flex'}
        flexDirection={isBreakpointOverlap ? 'row' : 'column'}
        justifyContent={'space-between'}
        gap={'2rem'}
      >
        <Box display={'flex'} gap={'2rem'} flexDirection={'column'}>
          <Box>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
              Цель сбора
            </Typography>
            <Typography variant='body2'>{goalDescription}</Typography>
          </Box>

          <Box>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
              Завершение
            </Typography>
            <Typography variant='body2'>{formatDate(endingDate)}</Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={{ minWidth: '130px' }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
              Мы собрали
            </Typography>
            <LinearProgress
              variant='determinate'
              value={Math.min((helpRequest.requestGoalCurrentValue / helpRequest.requestGoal) * 100, 100)}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='body2'>{formatNumber(requestGoalCurrentValue)} руб</Typography>
              <Typography variant='body2'>{formatNumber(requestGoal)} руб</Typography>
            </Box>
          </Box>
          <Typography variant='body2' sx={{ marginBottom: '10px', color: 'text.secondary' }}>
            Нас уже: {formatNumber(contributorsCount)}
          </Typography>
          <Button
            size='large'
            variant='contained'
            color='primary'
            fullWidth
            onClick={() => handleContributeToRequest()}
          >
            Помочь
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FundraisingCard;
