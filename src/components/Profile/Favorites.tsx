import { FC, useEffect } from 'react';
import { Box } from '@mui/material';

import { setHelpRequest, setFavouriteHelp, setIsLoading } from '../../store/user-favourites/userFavourites';
import { matchFavourites } from '../../helpers/matchFavourites';
import { fetchHelpRequestsAction } from '../../store/api-actions';
import { ViewHelpRequests } from '../ViewHelpRequests';
import { VIEW_TOGGLE_OPTIONS } from '../../constants/globalConsts';
import { getHelpRequests, getRequestDataError } from '../../store/help-requests/selectors';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getFavourites } from '../../store/user-favourites/favourites-selectors';

interface IFavorites {
  viewMode: VIEW_TOGGLE_OPTIONS;
  customNumberItemsPerPage: number;
}
const Favorites: FC<IFavorites> = ({ viewMode, customNumberItemsPerPage }) => {
  const dispatch = useAppDispatch();

  const helpRequestData = useAppSelector(getHelpRequests);
  const helpRequestDataError = useAppSelector(getRequestDataError);
  const userFavourites = useAppSelector(getFavourites);

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
    <Box height={'100%'} marginTop={'2rem'}>
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
