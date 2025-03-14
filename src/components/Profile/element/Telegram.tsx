import { Box } from '@mui/material';
import { ReactSVG } from 'react-svg';

export function Telegram() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100%'}
      gap={'2rem'}
    >
      <ReactSVG
        src='/img/telegram.svg'
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
}
