import { Box } from '@mui/material';
import { ReactSVG } from 'react-svg';

export function UserImg() {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      padding={
        'calc(4rem + 0.02*(100vw - 192rem)) calc(5rem + 0.027*(100vw - 192rem))'
      }
    >
      <ReactSVG
        src="../../public/img/profile.svg"
        beforeInjection={(svg) => {
          svg.removeAttribute('width');
          svg.removeAttribute('height');
        }}
        style={{
          width: 'calc(21.3rem + 0.11*(100vw - 192rem))',
          height: 'calc(16rem + 0.08*(100vw - 192rem))',
        }}
      />
    </Box>
  );
}
// calc(4rem-0.017*(100vw - 192rem))
