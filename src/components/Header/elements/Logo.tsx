import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Box } from '@mui/material';

import { useMode } from '../../../theme';

import LogoMinimal from './LogoMinimal';

const Logo = () => {
  const [theme] = useMode();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= theme.breakpoints.values.sm);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= theme.breakpoints.values.sm);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile ? (
    <LogoMinimal />
  ) : (
    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
      <ReactSVG
        src={isMobile ? '/img/LeftSideMinimal.svg' : '/img/LeftSide.svg'}
        beforeInjection={(svg) => {
          svg.removeAttribute('width');
          svg.removeAttribute('height');
        }}
        style={{
          width: 'calc(31.3rem + 0.11*(100vw - 192rem))',
        }}
      />
    </Box>
  );
};

export default Logo;
