import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { IHelpRequest } from '../../types/IHelpRequest';
import { formatDate, formatNumber, formatString } from '../../utils/formatUtils';
import useContributeToRequest from '../../hooks/useContributeToRequest';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import { getFavouriteRequestsIDs } from '../../store/userFavourites/userFavouritesSelectors';
import { useAppSelector } from '../../hooks/useAppSelector';

interface ICardItemProps {
  helpRequest: IHelpRequest;
}

const VerticalCard: FC<ICardItemProps> = (props) => {
  console.log('<VerticalCard/> Render');
  const { helpRequest } = props;
  const userFavouritesIDs = useAppSelector(getFavouriteRequestsIDs);
  const { handleContributeToRequest } = useContributeToRequest(helpRequest);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  function onMouseEnter(e) {
    const element = e.target as HTMLElement;
    if (element.scrollHeight > element.offsetHeight) setIsShow((value) => !value);
  }

  return (
    <Link to={`/request/${helpRequest.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          display: 'flex',
          marginTop: '20px',
          width: 320,
          flexDirection: 'column',
          padding: 0,
          gap: 0,
          [`@media (max-width:${450}px)`]: {
            width: '100%',
          },
        }}
      >
        <CardMedia
          sx={{ height: 220, width: 220, margin: '0 auto' }}
          image={
            helpRequest.requesterType === 'organization'
              ? '/img/organization.svg'
              : helpRequest.requesterType === 'person' && helpRequest.helpType === 'finance'
                ? '/img/person-finance.svg'
                : helpRequest.requesterType === 'person' && helpRequest.helpType === 'material'
                  ? '/img/person-material.svg'
                  : '/img/organization.svg' // default
          }
          title={helpRequest.requesterType}
        />

        <CardHeader
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '16px',
            textAlign: 'left',
            minHeight: '160px',
            width: '100%',
          }}
          title={formatString(helpRequest.title)}
          action={
            <FavouriteButton
              format={'vertical'}
              helpRequest={helpRequest}
              favouriteRequestsIDs={userFavouritesIDs}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Divider component='div' />
        <CardContent
          sx={{
            padding: '10px 16px',
            textAlign: 'left',
            flex: 0,
            display: 'block',
            gridTemplateColumns: 'none',
            gap: 0,
            maxWidth: 'none',
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

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
              Цель сбора
            </Typography>

            <Tooltip
              title={`${helpRequest.goalDescription}`}
              open={isShow}
              onOpen={onMouseEnter}
              onClose={() => setIsShow(false)}
            >
              <Typography
                variant='body2'
                minHeight={'3.5rem'}
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {helpRequest.goalDescription}
              </Typography>
            </Tooltip>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
              Завершение
            </Typography>
            <Typography variant='body2'>{formatDate(helpRequest.endingDate)}</Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
              Мы собрали
            </Typography>
            <LinearProgress
              variant='determinate'
              value={Math.min((helpRequest.requestGoalCurrentValue / helpRequest.requestGoal) * 100, 100)}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='body2'>{formatNumber(helpRequest.requestGoalCurrentValue)} руб</Typography>
              <Typography variant='body2'>{formatNumber(helpRequest.requestGoal)} руб</Typography>
            </Box>
          </Stack>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            padding: '0 16px 20px',
            textAlign: 'left',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: 'auto',
          }}
        >
          <Typography variant='body2' sx={{ marginBottom: '10px' }}>
            Нас уже: {formatNumber(helpRequest.contributorsCount)}
          </Typography>
          <Button
            size='large'
            variant='contained'
            color='primary'
            fullWidth
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              handleContributeToRequest();
            }}
          >
            Помочь
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default VerticalCard;
