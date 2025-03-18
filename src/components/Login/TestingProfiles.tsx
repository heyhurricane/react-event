import { Box, Typography } from '@mui/material';

import { useMode } from '../../theme';
import { testUsers } from '../../constants/globalConsts';

import { TestingProfilesItem } from './TestingProfilesItem';

const TestingProfiles = () => {
  const [theme] = useMode();
  return (
    <Box
      display={'flex'}
      width={'100%'}
      sx={{
        [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
          justifyContent: 'center',
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
            borderLeft: `1px solid ${theme.palette.grey[300]}`,
            borderRight: `1px solid ${theme.palette.grey[300]}`,
            padding: '3rem',
            paddingLeft: '5rem',
            paddingRight: '5rem',
          },
        }}
      >
        <Typography variant='h4'>Тестовые профили</Typography>
        <Box
          sx={{
            marginTop: '9rem',
            [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
              marginTop: '3rem',
            },
          }}
        >
          {testUsers.map((user, index) => (
            <TestingProfilesItem user={user} key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TestingProfiles;
