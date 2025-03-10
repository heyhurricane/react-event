import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/types';
import { getDateStr } from '../../features/getDateStr';
import { useMode } from '../../theme';

import { Row } from './element/Row';
import { ItemEducation } from './element/ItemEducation';
import { ItemBaseLocations } from './element/ItemBaseLocations';

export default function PersonalData() {
  const { data } = useSelector((state: RootState) => {
    return state.profile;
  });

  const [birthDate, setBirthDate] = useState('');
  const [theme] = useMode();
  useEffect(() => {
    if (Object.keys(data).length === 0) return;
    const birthdate = getDateStr(data.birthdate);
    setBirthDate(birthdate);
  }, [data]);

  return (
    <Box
      display={'flex'}
      gap={'3rem'}
      flexDirection={'column'}
      sx={{
        [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
          gap: '2rem',
        },
      }}
    >
      <Stack
        alignItems={'flex-start'}
        marginTop={'3rem'}
        gap={'1rem'}
        sx={{
          [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
            marginTop: '1.5rem',
          },
        }}
      >
        <Stack>
          <Typography variant='h6'>Профиль</Typography>
        </Stack>
        <Stack>
          <Stack direction={'row'} gap={'4px'}>
            <Row header={'Фамилия'} value={data.lastName} />
          </Stack>
          <Stack direction={'row'} gap={'4px'}>
            <Row header={'Имя'} value={data.name} />
          </Stack>
        </Stack>
      </Stack>

      <Stack alignItems={'flex-start'} gap={'1rem'}>
        <Stack>
          <Typography variant={'h6'}>Дата рождения</Typography>
        </Stack>

        <Stack direction={'row'} gap={'4px'}>
          <Typography>{birthDate}</Typography>
        </Stack>
      </Stack>

      <Stack alignItems={'flex-start'}>
        <Typography variant={'h6'} marginBottom={'10px'}>
          Локация для помощи
        </Typography>
        <Stack gap={'16px'}>
          {data.baseLocations.map(({ city, district }, i) => {
            return <ItemBaseLocations key={i} city={city} district={district} />;
          })}
        </Stack>
      </Stack>

      <Stack alignItems={'flex-start'}>
        <Typography variant={'h6'} marginBottom={'10px'}>
          Образование
        </Typography>
        <Stack gap={'16px'}>
          {data.educations.map(({ organizationName, level, graduationYear }, i) => {
            return (
              <ItemEducation
                key={i}
                organizationName={organizationName}
                level={level}
                graduationYear={graduationYear}
              />
            );
          })}
        </Stack>
      </Stack>

      <Stack alignItems={'flex-start'} gap={'1rem'}>
        <Stack>
          <Typography variant={'h6'}>Обо мне</Typography>
        </Stack>

        <Stack direction={'row'} gap={'4px'}>
          <Typography>{data.additionalInfo}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
