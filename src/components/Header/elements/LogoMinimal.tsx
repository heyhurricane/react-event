import { ReactSVG } from 'react-svg';
import { Box } from '@mui/material';

const LogoMinimal = () => {
  return (
    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
      <ReactSVG
        src='/img/LeftSideMinimal.svg'
        beforeInjection={(svg) => {
          svg.removeAttribute('width');
        }}
        style={{
          width: '4.5rem',
        }}
      />
    </Box>
  );
};

export default LogoMinimal;
