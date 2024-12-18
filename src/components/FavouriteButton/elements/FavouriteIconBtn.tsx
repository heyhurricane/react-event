import { Box, CircularProgress, IconButton } from '@mui/material';
import { IFavouriteButton } from '../../../types/IFavouriteButton';
import { Star, StarBorder } from '@mui/icons-material';
import { forwardRef } from 'react';

type FavouriteIconButtonProps = IFavouriteButton;

const FavouriteIconBtn = forwardRef<HTMLDivElement, FavouriteIconButtonProps>(
  ({ handleToggleFavourite, isFavourite, ariaLabel, isLoading, ...rest }, ref) => {
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
  }
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
