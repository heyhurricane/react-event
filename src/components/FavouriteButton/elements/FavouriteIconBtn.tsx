import { Box, CircularProgress, IconButton } from '@mui/material';
import { forwardRef } from 'react';
import { Star, StarBorder } from '@mui/icons-material';

import { IFavouriteButton } from '../../../types/IFavouriteButton';

const FavouriteIconBtn = forwardRef<HTMLDivElement, IFavouriteButton>(
  ({ handleToggleFavourite, isFavourite, ariaLabel, isLoading, ...rest }, ref) => {
    console.log('<FavouriteIconBtn /> Render');
    return (
      <Box ref={ref} {...rest}>
        <IconButton
          aria-label={ariaLabel}
          disabled={isLoading}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            handleToggleFavourite();
          }}
        >
          {isLoading ? <CircularProgress size={22} /> : <FavouriteIcon isFavourite={isFavourite} />}
          {}
        </IconButton>
      </Box>
    );
  },
);

export default FavouriteIconBtn;

const FavouriteIcon = (props: { isFavourite: boolean }) => {
  const iconColor = props.isFavourite ? 'rgb(255, 165, 0)' : 'inherit';
  return (
    <Box>
      {props.isFavourite ? (
        <Star sx={{ color: iconColor, '&:hover': { color: '#FF7F00' } }} />
      ) : (
        <StarBorder sx={{ color: iconColor, '&:hover': { color: '#FF7F00' } }} />
      )}
    </Box>
  );
};
