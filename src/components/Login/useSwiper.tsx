import { useRef } from 'react';

type useSwiperProps = {
  cooldownDuration: number, 
  currentItem: number, 
  maxItems: number, 
  action: (arrow: 'previous' | 'next', step?: number) => void
}

export function useSwiper({
  cooldownDuration,
  currentItem,
  maxItems,
  action
}: useSwiperProps) {

  const touchStartRef = useRef<number>(0);
  const isCooldown = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isCooldown.current) return;

    const touchEnd = e.changedTouches[0].clientX;
    const swipeThreshold = 50;

    isCooldown.current = true;

    if (touchStartRef.current - touchEnd > swipeThreshold && currentItem !== maxItems) {
      action('next');
    } else if (touchEnd - touchStartRef.current > swipeThreshold && currentItem !== 1) {
      action('previous');
    }

    setTimeout(() => {
      isCooldown.current = false;
    }, cooldownDuration);
  }

  return { handleTouchStart, handleTouchEnd }
}