import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';

import { IHelpRequest } from '../../types/IHelpRequest';
import { VIEW_TOGGLE_OPTIONS } from '../../constants/globalConsts';
import { usePagination } from '../../hooks/usePagination';

import CardList from './../CardList/CardList';
import MapWrapper from './../Map/MapWrapper';
import Pagination from './../Pagination/Pagination';
import Loading from './../Status/Loading';
import Error from './../Status/Error';
import NotFoundResult from './../Status/NotFoundResult';

interface IViewHelpRequests {
  viewMode: string;
  helpRequests: IHelpRequest[];
  customNumberItemsPerPage?: number;
  notFoundResult: boolean;
  setIsResetFilters?: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  isResetFilters?: boolean;
  isHelpRequestsError: boolean;
  isFavouriteRequestsError?: boolean;
}

const ViewHelpRequests: FC<IViewHelpRequests> = ({
  viewMode,
  helpRequests,
  customNumberItemsPerPage,
  notFoundResult,
  setIsResetFilters,
  isLoading,
  isResetFilters,
  isHelpRequestsError,
  isFavouriteRequestsError,
}) => {
  const [isInitialReset, setIsInitialReset] = useState(true);
  const itemsPerPage = customNumberItemsPerPage || 3;
  const scrollCooldownDuration = 50;

  const { currentPage, setCurrentPage, totalPages, indexOfLastItem, indexOfFirstItem } = usePagination({
    quantityHelpRequests: helpRequests.length,
    itemsPerPage,
  });

  const isMediumScreen = useMediaQuery('(max-width:604px)');
  const isSmallScreen = useMediaQuery('(max-width:380px)');

  const currentItems = useMemo(() => {
    return helpRequests.slice(indexOfFirstItem, indexOfLastItem);
  }, [helpRequests, indexOfFirstItem, indexOfLastItem]);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    },
    [setCurrentPage],
  );

  const renderErrorMessage = useCallback(() => {
    if (isHelpRequestsError || isFavouriteRequestsError) {
      return <Error />;
    }
    if (isLoading) {
      return <Loading />;
    }
    if (notFoundResult) {
      return <NotFoundResult />;
    }
    return null;
  }, [isHelpRequestsError, isFavouriteRequestsError, isLoading, notFoundResult]);

  const errorMessage = useMemo(() => renderErrorMessage(), [renderErrorMessage]);

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

export default ViewHelpRequests;
