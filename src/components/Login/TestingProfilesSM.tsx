import { Box, Typography } from '@mui/material';

import { useMode } from '../../theme';

import { TestProfilesSlider } from './TestProfilesSlider';

const TestingProfilesSM = () => {
  const [theme] = useMode();

  return (
    <Box
      display={'flex'}
      width={'100%'}
      sx={{
        overflow: 'hidden',
        [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
          justifyContent: 'center',
          height: '100%',
        },
      }}
    >
      <Box
        marginLeft={'4rem'}
        marginTop={'6.4rem'}
        sx={{
          [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
            marginLeft: '2rem',
          },
          [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
            marginTop: '0rem',
            marginLeft: '0rem',
            padding: '3rem',
            paddingLeft: '6rem',
            paddingRight: '6rem',
          },
        }}
      >
        <Typography variant='h4' marginLeft={'3.5rem'}>
          Тестовые профили
        </Typography>
        <TestProfilesSlider />
      </Box>
    </Box>
  );
};

export default TestingProfilesSM;
