import { Box } from '@mui/material';
import { FC, useEffect, useRef, useState, useCallback } from 'react';

import { IHelpRequest } from '../../types/IHelpRequest';
import './ScrollAndSwipeAnimations.css';

interface IScrollAndSwipeHandlerProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  helpRequests: IHelpRequest[];
  cooldownDuration: number;
  viewMode: string;
  children: React.ReactNode;
}

const ScrollAndSwipeWrapper: FC<IScrollAndSwipeHandlerProps> = (props) => {
  const { currentPage, totalPages, setCurrentPage, helpRequests, cooldownDuration, viewMode, children } = props;

  const [animationState, setAnimationState] = useState<'enter' | 'exit' | 'none'>('none');
  const listRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number>(0);

  const isCooldown = useRef(false);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      if (isCooldown.current) return;

      isCooldown.current = true;

      if (e.deltaY > 0 && currentPage < totalPages) {
        setAnimationState('exit');
        setCurrentPage((prevPage) => prevPage + 1);
      } else if (e.deltaY < 0 && currentPage > 1) {
        setAnimationState('exit');
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
      }

      setTimeout(() => {
        isCooldown.current = false;
      }, cooldownDuration);
    },
    [currentPage, totalPages, cooldownDuration, setCurrentPage],
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (isCooldown.current) return;

      const touchEnd = e.changedTouches[0].clientX;
      const swipeThreshold = 50;

      isCooldown.current = true;

      if (touchStartRef.current - touchEnd > swipeThreshold && currentPage < totalPages) {
        setAnimationState('exit');
        setCurrentPage((prevPage) => prevPage + 1);
      } else if (touchEnd - touchStartRef.current > swipeThreshold && currentPage > 1) {
        setAnimationState('exit');
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
      }

      setTimeout(() => {
        isCooldown.current = false;
      }, cooldownDuration);
    },
    [currentPage, totalPages, cooldownDuration, setCurrentPage],
  );

  useEffect(() => {
    const listElement = listRef.current;
    if (listElement && totalPages > 1) {
      listElement.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (listElement) {
        listElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [totalPages, currentPage]);

  useEffect(() => {
    if (animationState === 'exit') {
      setAnimationState('enter');
    }
  }, [helpRequests, animationState]);

  return (
    <Box
      className={animationState === 'exit' ? 'card-exit' : animationState === 'enter' ? 'card-enter' : ''}
      ref={listRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      width={viewMode === 'grid' ? 'fitContent' : '100%'}
    >
      {children}
    </Box>
  );
};

export default ScrollAndSwipeWrapper;
