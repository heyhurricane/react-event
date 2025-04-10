import { Box, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { IHelpRequest } from '../../types/IHelpRequest';
import { formatDate, formatString } from '../../utils/formatUtils';
import useContributeToRequest from '../../hooks/useContributeToRequest';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import { getFavouriteRequestsIDs } from '../../store/userFavourites/userFavouritesSelectors';
import DonationStatusCard from '../HelpRequest/DonationStatusCard';
import { useAppSelector } from '../../hooks/useAppSelector';

interface ICardItemProps {
  helpRequest: IHelpRequest;
}

const HorizontalCard: FC<ICardItemProps> = (props) => {
  const { helpRequest } = props;
  const userFavouritesIDs = useAppSelector(getFavouriteRequestsIDs);

  const { handleContributeToRequest } = useContributeToRequest(helpRequest);
  const [isLoading, setIsLoading] = useState<boolean>(false); // /n
  return (
    <Link to={`/request/${helpRequest.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          display: 'flex',
          boxShadow: 'none',
          borderBottom: '1px solid #0000001F',
          borderRadius: '0px',
          width: '100%',
          flexDirection: 'row',
          padding: '20px 0 20px 0px',
          gap: '30px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '23rem',
          }}
        >
          <CardHeader sx={{ marginBottom: '30px', padding: 0 }} title={formatString(helpRequest.title)} />
          <DonationStatusCard
            contributorsCount={helpRequest.contributorsCount}
            requestGoalCurrentValue={helpRequest.requestGoalCurrentValue}
            requestGoal={helpRequest.requestGoal}
            handleDonation={handleContributeToRequest}
          />
        </Box>

        <CardContent
          sx={{
            padding: 0,
            textAlign: 'left',
            flex: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px',
            maxWidth: '512px',
          }}
        >
          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
              Организатор
            </Typography>
            <Typography variant='body2'>{helpRequest.organization.title}</Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
              Локация
            </Typography>
            <Typography variant='body2'>{helpRequest.location.district}</Typography>
            <Typography variant='body2'>Населенный пункт: {helpRequest.location.city}</Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px', order: 1 }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
              Цель сбора
            </Typography>
            <Typography variant='body2'>{helpRequest.goalDescription}</Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
              Завершение
            </Typography>
            <Typography variant='body2'>{formatDate(helpRequest.endingDate)}</Typography>
          </Stack>
        </CardContent>
        <FavouriteButton
          format={'horizontal'}
          helpRequest={helpRequest}
          favouriteRequestsIDs={userFavouritesIDs}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </Card>
    </Link>
  );
};

export default HorizontalCard;
