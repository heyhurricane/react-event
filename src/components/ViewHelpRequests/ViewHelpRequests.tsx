import { FC, useEffect, useMemo, useState } from 'react';
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
  setShouldResetPagination?: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  shouldResetPagination?: boolean;
  isHelpRequestsError: boolean;
  isFavouriteRequestsError?: boolean;
}

const ViewHelpRequests: FC<IViewHelpRequests> = ({
  viewMode,
  helpRequests,
  customNumberItemsPerPage,
  notFoundResult,
  setShouldResetPagination,
  isLoading,
  shouldResetPagination,
  isHelpRequestsError,
  isFavouriteRequestsError,
}) => {
  const [isInitialReset, setIsInitialReset] = useState(true);
  const itemsPerPage = (viewMode !== VIEW_TOGGLE_OPTIONS.List && customNumberItemsPerPage) || 3;
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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const renderErrorMessage = () => {
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
    if (setShouldResetPagination && shouldResetPagination && !isInitialReset) {
      setCurrentPage(1);
      setShouldResetPagination(false);
    } else if (isInitialReset) {
      setIsInitialReset(false);
    }
  }, [shouldResetPagination]);

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
