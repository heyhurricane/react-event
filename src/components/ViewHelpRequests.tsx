import { FC, useEffect, useMemo, useState } from 'react';
import { Box, Skeleton, useMediaQuery } from '@mui/material';

import { HelpRequest } from '../types/HelpRequest';
import { VIEW_TOGGLE_OPTIONS } from '../const/const';
import { usePagination } from '../hooks/usePagination';
import useParseURL from '../hooks/useParseURL';

import CardList from './CardList/CardList';
import MapWrapper from './Map/MapWrapper';
import { ErrorComponent } from './Error';
import { NotFoundResult } from './NotFoundResult';
import Pagination from './Pagination';

interface IViewHelpRequests {
  viewMode: string;
  helpRequests: HelpRequest[];
  customItemsPerPage?: number;
  notFoundResult: boolean;
  setIsResetFilters?: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  isResetFilters?: boolean;
  isHelpRequestsError: boolean;
  isFavouriteRequestsError?: boolean;
}

export const ViewHelpRequests: FC<IViewHelpRequests> = ({
  viewMode,
  helpRequests,
  customItemsPerPage,
  notFoundResult,
  setIsResetFilters,
  isLoading,
  isResetFilters,
  isHelpRequestsError,
  isFavouriteRequestsError,
}) => {
  const [isInitialReset, setIsInitialReset] = useState(true);
  const itemsPerPage = customItemsPerPage || 3;
  const scrollCooldownDuration = 50;

  const { currentPage, setCurrentPage, totalPages, indexOfLastItem, indexOfFirstItem } = usePagination({
    quantityHelpRequests: helpRequests.length,
    itemsPerPage,
  });

  // Rewrite currentPage with data from URL
  useParseURL({
    currentPage,
    setCurrentPage,
  });

  const isMediumScreen = useMediaQuery('(max-width:604px)');
  const isSmallScreen = useMediaQuery('(max-width:380px)');

  const currentItems = useMemo(() => {
    return helpRequests.slice(indexOfFirstItem, indexOfLastItem);
  }, [helpRequests, indexOfFirstItem, indexOfLastItem]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const renderErrorMessage = () => {
    if (isHelpRequestsError || isFavouriteRequestsError) {
      return <ErrorComponent />;
    }
    if (isLoading) {
      return <Skeleton width={'100px'} height={'100px'} />;
    }
    if (notFoundResult) {
      return <NotFoundResult />;
    }

    return null;
  };

  const errorMessage = renderErrorMessage();

  let paginationSize;
  if (isSmallScreen) {
    paginationSize = 'small';
  } else if (isMediumScreen) {
    paginationSize = 'medium';
  } else {
    paginationSize = 'large';
  }

  useEffect(() => {
    if (isResetFilters && setIsResetFilters && !isInitialReset) {
      setCurrentPage(1);
      setIsResetFilters(false);
    } else if (isInitialReset) {
      setIsInitialReset(false);
    }
  }, [isResetFilters]);

  return (
    <Box sx={{ height: '100%' }}>
      {errorMessage}
      {errorMessage === null && (
        <>
          {viewMode === VIEW_TOGGLE_OPTIONS.Map ? (
            <MapWrapper helpRequests={helpRequests} />
          ) : (
            <Box>
              <CardList
                helpRequests={currentItems}
                viewMode={viewMode}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                scrollCooldownDuration={scrollCooldownDuration}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                size={paginationSize}
                handlePageChange={handlePageChange}
                hidePrevButton={isMediumScreen}
                hideNextButton={isMediumScreen}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
