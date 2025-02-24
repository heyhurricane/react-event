import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useBreakpointOverlap } from '../../hooks/useBreakpointOverlap';
import { useMode } from '../../theme';
import { Box } from '@mui/material';
import { LogoMinimal } from './LogoMinimal';

export function Logo() {
  const { isBreakpointOverlap } = useBreakpointOverlap();
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

  return (
    isMobile ? <LogoMinimal/> 
    : <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
        <ReactSVG
          src={isMobile ? '/img/LeftSideMinimal.svg' : '/img/LeftSide.svg'}
          beforeInjection={(svg) => {
            svg.removeAttribute('width');
            svg.removeAttribute('height');
          }}
          style={{
            width: `${isBreakpointOverlap ? '12rem ' : 'calc(31.3rem + 0.11*(100vw - 192rem))'}`,
          }}
        />
      </Box>
  );
}
