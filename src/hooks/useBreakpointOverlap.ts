import { useEffect, useState } from 'react';
import { useMode } from '../theme';

export function useBreakpointOverlap(breakpointOverlapValue?: number) {
  const [theme] = useMode();
  const breakpointOverlap = breakpointOverlapValue ? breakpointOverlapValue : theme.breakpoints.values.sm;

  const [isBreakpointOverlap, setIsBreakpointOverlap] = useState<boolean>(window.innerWidth <= breakpointOverlap);
  useEffect(() => {
    const checkScreenWidth = () => {
      setIsBreakpointOverlap(window.innerWidth <= breakpointOverlap);
    };

    window.addEventListener('resize', checkScreenWidth);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, [breakpointOverlap]);
  return { isBreakpointOverlap };
}
