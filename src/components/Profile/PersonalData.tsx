import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { getDateStr } from '../../helpers/getDateStr';
import { useMode } from '../../theme';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getProfileData } from '../../store/userProfile/profileSelectors';

import Row from './element/Row';
import ItemEducation from './element/ItemEducation';
import ItemBaseLocations from './element/ItemBaseLocations';

const PersonalData = () => {
  const { data } = useAppSelector(getProfileData);
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
      flexDirection={'column'}
      gap={'3rem'}
      sx={{
        [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
          gap: '2rem',
        },
      }}
    >
      <Stack
        alignItems={'flex-start'}
        gap={'1rem'}
        marginTop={'3rem'}
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
          <Stack direction={'row'} gap={'0.4rem'}>
            <Row header={'Фамилия'} value={data.lastName} />
          </Stack>
          <Stack direction={'row'} gap={'0.4rem'}>
            <Row header={'Имя'} value={data.name} />
          </Stack>
        </Stack>
      </Stack>

      <Stack alignItems={'flex-start'} gap={'1rem'}>
        <Stack>
          <Typography variant={'h6'}>Дата рождения</Typography>
        </Stack>

        <Stack direction={'row'} gap={'0.4rem'}>
          <Typography>{birthDate}</Typography>
        </Stack>
      </Stack>

      <Stack alignItems={'flex-start'}>
        <Typography variant={'h6'} marginBottom={'1rem'}>
          Локация для помощи
        </Typography>
        <Stack gap={'1.6rem'}>
          {data.baseLocations.map(({ city, district }, i) => {
            return <ItemBaseLocations key={i} city={city} district={district} />;
          })}
        </Stack>
      </Stack>

      <Stack alignItems={'flex-start'}>
        <Typography variant={'h6'} marginBottom={'1rem'}>
          Образование
        </Typography>
        <Stack gap={'1.6rem'}>
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

        <Stack direction={'row'} gap={'0.4rem'}>
          <Typography>{data.additionalInfo}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PersonalData;
