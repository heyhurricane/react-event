import { Box, Button, Divider, Stack, Typography } from '@mui/material';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logOut } from '../../store/authorization/authorizationSlice';
import { useMode } from '../../theme';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getProfileData } from '../../store/userProfile/profileSelectors';

import UserImg from './element/UserImg';

const CardProfile = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(getProfileData);
  const [theme] = useMode();

  function handleClick() {
    dispatch(logOut());
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'1rem'} padding={'1rem 2rem'}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        sx={{
          [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '1.5rem',
          },
        }}
      >
        <UserImg />
        <Divider
          sx={{
            [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
              display: 'none',
            },
          }}
        />
        <Stack>
          <Stack
            marginTop={'2rem'}
            marginBottom={'1rem'}
            alignItems={'flex-start'}
            sx={{
              [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                margin: '0',
              },
            }}
          >
            <Typography
              variant='h6'
              marginLeft={'2rem'}
              sx={{
                [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                  margin: '0',
                },
              }}
            >
              {data.name} {data.lastName}
            </Typography>
          </Stack>

          <Stack
            direction={'row'}
            gap={'0.4rem'}
            marginLeft={'2rem'}
            marginBottom={'5rem'}
            sx={{
              [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                margin: '0',
              },
            }}
          >
            <Typography
              fontSize={14}
              fontWeight={500}
              sx={{
                [`@media (min-width: ${0}px) and (max-width: ${426}px)`]: {
                  display: 'none',
                },
              }}
            >
              Статус:
            </Typography>
            <Typography fontSize={14}> {data.status}</Typography>
          </Stack>
        </Stack>

        <Stack
          margin={'0 2rem'}
          marginBottom={'2rem'}
          justifyContent={'center'}
          sx={{
            [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
              margin: '0',
            },
            [`@media (max-width:${426}px)`]: {
              display: 'none',
            },
          }}
        >
          <Button
            variant='outlined'
            sx={{
              color: '#000',
              border: '1px solid #000',
              padding: 0,
            }}
            onClick={handleClick}
          >
            Выйти из аккаунта
          </Button>
        </Stack>
      </Box>
      <Stack
        display={'none'}
        margin={'0 2rem'}
        marginBottom={'2rem'}
        justifyContent={'center'}
        sx={{
          [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
            margin: '0',
          },
          [`@media (min-width: ${0}px) and (max-width: ${426}px)`]: {
            display: 'flex',
          },
        }}
      >
        <Button
          variant='outlined'
          sx={{
            color: '#000',
            border: '1px solid #000',
            padding: 0,
          }}
          onClick={handleClick}
        >
          Выйти из аккаунта
        </Button>
      </Stack>
    </Box>
  );
};

export default CardProfile;
