import { Box, Typography } from '@mui/material';
import { FC } from 'react';

import { IHelpRequest } from '../../types/IHelpRequest';
import ViewToggle from '../ViewToggle/ViewToggle';
import { useViewMode } from '../../hooks/useViewMode';
import ViewHelpRequests from '../ViewHelpRequests/ViewHelpRequests';

interface IRequestsProps {
  helpRequests: IHelpRequest[];
  customNumberItemsPerPage?: number;
  noSearchResult: boolean;
  setShouldResetPagination: React.Dispatch<React.SetStateAction<boolean>>;
  isHelpRequestsError: boolean;
  isFavouriteRequestsError?: boolean;
  isLoading: boolean;
  shouldResetPagination: boolean;
}

const HelpRequestsComponent: FC<IRequestsProps> = ({
  helpRequests,
  customNumberItemsPerPage,
  noSearchResult,
  setShouldResetPagination,
  isHelpRequestsError,
  isLoading,
  shouldResetPagination,
  isFavouriteRequestsError,
}) => {
  const { viewMode, handleViewChange } = useViewMode();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h6'>Найдено: {isFavouriteRequestsError ? 0 : helpRequests.length}</Typography>
        <ViewToggle viewMode={viewMode} onOptionChange={handleViewChange} />
      </Box>
      <ViewHelpRequests
        viewMode={viewMode}
        helpRequests={helpRequests}
        customNumberItemsPerPage={customNumberItemsPerPage}
        notFoundResult={noSearchResult}
        setShouldResetPagination={setShouldResetPagination}
        isHelpRequestsError={isHelpRequestsError}
        isLoading={isLoading}
        shouldResetPagination={shouldResetPagination}
        isFavouriteRequestsError={isFavouriteRequestsError}
      />
    </Box>
  );
};

export default HelpRequestsComponent;
