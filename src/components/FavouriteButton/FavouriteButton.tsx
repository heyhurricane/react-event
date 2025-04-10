import { Box, Tooltip } from '@mui/material';
import { FC, useRef, useState } from 'react';

import { IHelpRequest } from '../../types/IHelpRequest';
import { useFavourites } from '../../hooks/useFavourites';

import FavouriteIconBtn from './elements/FavouriteIconBtn';

interface IFavouriteButton {
  format: string;
  favouriteRequestsIDs: string[];
  helpRequest: IHelpRequest;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const FavouriteButton: FC<IFavouriteButton> = (props) => {
  const { helpRequest, favouriteRequestsIDs, isLoading, setIsLoading } = props;
  const { handleAddToFavourites, handleRemoveFavourite } = useFavourites();
  const isFavourite = favouriteRequestsIDs.includes(helpRequest.id);

  const handleToggleFavourite = async () => {
    setIsLoading(true);
    try {
      if (isFavourite) {
        await handleRemoveFavourite(helpRequest.id);
      } else {
        await handleAddToFavourites(helpRequest.id);
      }
    } catch (error) {
      console.error('Error toggling favourite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const action = isFavourite ? 'Удалить из избранного' : 'В избранное';
  const buttonText = `${action}`;
  const ariaLabel = `${action}`;
  const [isShow, setIsShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box>
      <Tooltip title={buttonText} open={isShow} onClose={() => setIsShow(false)} onOpen={() => setIsShow(true)}>
        <FavouriteIconBtn
          handleToggleFavourite={handleToggleFavourite}
          ariaLabel={ariaLabel}
          isLoading={isLoading}
          isFavourite={isFavourite}
          ref={ref}
        />
      </Tooltip>
    </Box>
  );
};

export default FavouriteButton;
