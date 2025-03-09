import { useState } from 'react';

import useParseURL from './useParseURL';

interface IUsePagination {
  quantityHelpRequests: number;
  itemsPerPage: number;
  isURLParsingEnabled?: boolean;
}

export function usePagination({ quantityHelpRequests, itemsPerPage, isURLParsingEnabled }: IUsePagination) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Rewrite currentPage with data from URL
  useParseURL({
    currentPage,
    setCurrentPage,
  });
  const totalPages = Math.ceil(quantityHelpRequests / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return {
    currentPage,
    totalPages,
    indexOfLastItem,
    indexOfFirstItem,
    setCurrentPage,
  };
}
