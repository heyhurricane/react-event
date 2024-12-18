export interface IFavouriteButton {
  handleToggleFavourite: () => Promise<void>;
  isFavourite: boolean;
  ariaLabel: string;
  isLoading: boolean;
}
