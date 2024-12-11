import { Box, Paper, Stack, Typography } from '@mui/material';
import { HelpRequest } from '../types/HelpRequest';
import { FC, useState } from 'react';
import { formatDate, formatPhoneNumber, formatString } from '../helper-functions/helper-functions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { useSelector } from 'react-redux';
import FavouriteButton from './FavouriteButton/FavouriteButton';
import { getFavouriteRequestsIDs } from '../store/user-favourites/favourites-selectors';
import { useBreakpointOverlap } from '../hooks/useBreakpointOverlap';

type RequestProps = {
  helpRequest: HelpRequest;
};

const FundraisingForm: FC<RequestProps> = ({ helpRequest }) => {
  const { title, organization, description, goalDescription, actionsSchedule, endingDate, location, contacts } =
    helpRequest;
  const userFavouritesIDs = useSelector(getFavouriteRequestsIDs);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isBreakpointOverlap } = useBreakpointOverlap(700);

  return (
    <Paper sx={{ padding: '1.5rem' }}>
      <Box display={'flex'} flexDirection={'column'} gap={'30px'}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h5">{formatString(title)}</Typography>
          <FavouriteButton
            format={isBreakpointOverlap ? 'vertical' : 'horizontal'}
            helpRequest={helpRequest}
            favouriteRequestsIDs={userFavouritesIDs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Box>

        <Stack spacing={2} sx={{ maxWidth: '550px' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }} mb={'10px'}>
              Организация
            </Typography>
            <Typography variant="body2" mb={'4px'}>
              {organization.title}
            </Typography>

            <Stack display={'flex'} gap={'4px'} flexDirection={'row'} alignItems={'center'}>
              <VerifiedRoundedIcon
                fontSize="small"
                color="primary"
                sx={{ color: organization.isVerified ? 'primary' : 'action.disabled' }}
              />
              <Typography variant="caption">
                {organization.isVerified ? 'Организация проверена' : 'Организация не проверена'}
              </Typography>
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }} mb={'10px'}>
              Кому мы помогаем
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }} mb={'10px'}>
              Цель сбора
            </Typography>
            <Typography variant="body2">{goalDescription}</Typography>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }} mb={'10px'}>
              План действий
            </Typography>

            <Box display={'flex'} gap={'8px'} flexDirection={'column'}>
              {actionsSchedule.map((action) => {
                return (
                  <Box key={action.stepLabel} display={'flex'} alignItems={'center'} gap={'4px'}>
                    <CheckCircleOutlineIcon
                      fontSize="medium"
                      sx={{ color: action.isDone ? 'success.light' : 'action.disabled' }}
                    />
                    <Typography variant="body2" lineHeight={'100%'}>
                      {action.stepLabel}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" mb={'10px'} sx={{ fontWeight: 'bold' }}>
              Завершение
            </Typography>
            <Typography variant="body2">{formatDate(endingDate)}</Typography>
          </Box>

          <Box>
            <Typography variant="h6" mb={'10px'} sx={{ fontWeight: 'bold' }}>
              Локация
            </Typography>

            <Stack display={'flex'} gap={'4px'} flexDirection={'row'}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Область
              </Typography>
              <Typography variant="body2">{location.district}</Typography>
            </Stack>

            <Stack display={'flex'} gap={'4px'} flexDirection={'row'}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Насленный пункт:
              </Typography>
              <Typography variant="body2">{location.city}</Typography>
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" mb={'10px'} sx={{ fontWeight: 'bold' }}>
              Контакты
            </Typography>

            <Box
              display={'flex'}
              justifyContent={'space-between'}
              gap={isBreakpointOverlap ? '8px' : 0}
              flexDirection={isBreakpointOverlap ? 'column' : 'row'}
            >
              <Stack>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Телефон
                </Typography>
                <Typography variant="body2">{contacts.phone ? formatPhoneNumber(contacts.phone) : '-'}</Typography>
              </Stack>

              <Stack>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  E-mail
                </Typography>
                <Typography variant="body2">{contacts.email}</Typography>
              </Stack>

              <Stack>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Сайт
                </Typography>
                <Typography variant="body2">{contacts.website}</Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default FundraisingForm;
