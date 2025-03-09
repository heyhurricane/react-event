import { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch, RootState } from '../../store/types';
import { setHelpRequest, setFavouriteHelp, setIsLoading } from '../../store/user-favourites/userFavourites';
import { matchFavourites } from '../../features/matchFavourites';
import { fetchHelpRequestsAction } from '../../store/api-actions';
import { ViewHelpRequests } from '../ViewHelpRequests';
import { VIEW_TOGGLE_OPTIONS } from '../../const/const';

interface IFavorites {
  viewMode: VIEW_TOGGLE_OPTIONS;
  customNumberItemsPerPage: number;
}
const Favorites: FC<IFavorites> = ({ viewMode, customNumberItemsPerPage }) => {
  const userFavourites = useSelector((state: RootState) => {
    return state.favourites;
  });

  const helpRequestData = useSelector((state: RootState) => {
    return state.HELP_REQUEST.helpRequestsList;
  });

  const helpRequestDataError = useSelector((state: RootState) => {
    return state.HELP_REQUEST.hasError;
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (helpRequestData.length > 0) {
      dispatch(setHelpRequest(helpRequestData));
    } else {
      dispatch(setIsLoading());
      dispatch(fetchHelpRequestsAction());
    }
  }, [helpRequestData.length]);

  useEffect(() => {
    if (userFavourites.helpRequest.length === 0) return;

    const favouriteHelp = matchFavourites(userFavourites.helpRequest, userFavourites.favouriteRequests);
    dispatch(setFavouriteHelp(favouriteHelp));
  }, [userFavourites.helpRequest, userFavourites.favouriteRequests]);

  useEffect(() => {
    if (helpRequestDataError) dispatch(setIsLoading());
  }, [helpRequestDataError]);

  const notFoundResult = userFavourites.isData && userFavourites.favouriteRequests.length === 0;

  return (
    <Box height={'100%'} marginTop={'20px'}>
      <ViewHelpRequests
        viewMode={viewMode}
        helpRequests={userFavourites.favouriteHelp}
        isLoading={userFavourites.isLoading}
        isHelpRequestsError={helpRequestDataError}
        notFoundResult={notFoundResult}
        customNumberItemsPerPage={customNumberItemsPerPage}
      />
    </Box>
  );
};
export default Favorites;
