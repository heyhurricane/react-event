import { useEffect, useState } from 'react';

import useParseURL from './useParseURL';

interface IUsePagination {
  quantityHelpRequests: number;
  itemsPerPage: number;
}

export function usePagination({ quantityHelpRequests, itemsPerPage }: IUsePagination) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  useParseURL({
    currentPage,
    setCurrentPage,
  });
  const totalPages = Math.ceil(quantityHelpRequests / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    if (totalPages) {
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
      if (currentPage < 1) {
        setCurrentPage(1);
      }
    }
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    indexOfLastItem,
    indexOfFirstItem,
    setCurrentPage,
  };
}
