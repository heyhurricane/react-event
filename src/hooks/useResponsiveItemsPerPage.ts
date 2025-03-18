import { useState, useEffect } from 'react';

export const useResponsiveItemsPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;

      if (width < 860) {
        setItemsPerPage(1);
      } else if (width >= 860 && width < 961) {
        setItemsPerPage(2);
      } else if (width >= 961 && width < 1160) {
        setItemsPerPage(1);
      } else if (width >= 1160 && width < 1582) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();

    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  return itemsPerPage;
};
