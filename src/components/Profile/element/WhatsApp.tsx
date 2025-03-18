import { Box } from '@mui/material';
import { ReactSVG } from 'react-svg';

const WhatsApp = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      height={'100%'}
      gap={'2rem'}
    >
      <ReactSVG
        src='/img/whatsapp.svg'
        beforeInjection={(svg) => {
          svg.removeAttribute('width');
          svg.removeAttribute('height');
        }}
        style={{
          width: '2.4rem',
          height: '2.4rem',
        }}
      />
    </Box>
  );
};

export default WhatsApp;
