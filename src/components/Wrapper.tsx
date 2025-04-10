import { Box } from '@mui/material';

import { useMode } from '../theme';

import Header from './Header/Header';
import Footer from './Footer/Footer';

const Wrapper = ({ children }) => {
  const [theme] = useMode();

  return (
    <Box
      width={'100%'}
      minHeight={'100vh'}
      bgcolor={theme.palette.background.paper}
      display={'flex'}
      flexDirection={'column'}
    >
      <Header />
      <Box
        margin={'0 calc(8.1rem + 0.109375 * (100vw - 192rem))'}
        flexGrow={'1'}
        display={'flex'}
        sx={{
          [`@media (max-width:${theme.breakpoints.values.lg}px)`]: {
            margin: '0 4rem',
          },
          [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
            margin: '0 2rem',
          },
          [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
            margin: '0 0',
          },
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Wrapper;
