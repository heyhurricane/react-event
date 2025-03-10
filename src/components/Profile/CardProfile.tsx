import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/types';
import { logOut } from '../../store/authorization';
import { useMode } from '../../theme';

import { UserImg } from './element/UserImg';

export default function CardProfile() {
  const { data } = useSelector((state: RootState) => {
    return state.profile;
  });
  const [theme] = useMode();
  const dispatch = useDispatch();
  function handleClick() {
    //вызывать функцию для удаления токена
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
            marginBottom={'10px'}
            marginTop={'20px'}
            alignItems={'flex-start'}
            sx={{
              [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                margin: '0',
              },
            }}
          >
            <Typography
              variant='h6'
              marginLeft={'20px'}
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
            marginLeft={'20px'}
            direction={'row'}
            gap={'4px'}
            marginBottom={'50px'}
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
          margin={'0 20px'}
          marginBottom={'20px'}
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
        margin={'0 20px'}
        marginBottom={'20px'}
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
}
