import { Box } from '@mui/material';
import { ReactSVG } from 'react-svg';

export function UserImg() {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      padding={'calc(4rem + 0.02*(100vw - 192rem)) calc(5rem + 0.027*(100vw - 192rem))'}
    >
      <ReactSVG
        src='/img/profile.svg'
        beforeInjection={(svg) => {
          svg.removeAttribute('width');
          svg.removeAttribute('height');
        }}
        style={{
          width: 'calc(21.3rem + 0.11*(100vw - 192rem))',
          minWidth: '6.4rem',
          height: 'calc(16rem + 0.08*(100vw - 192rem))',
          minHeight: '4.8rem',
        }}
      />
    </Box>
  );
}
