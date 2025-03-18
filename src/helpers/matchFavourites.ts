export function matchFavourites(helpRequest, favouriteRequests) {
  const favouriteHelp = favouriteRequests
    .map((favouriteId) => helpRequest.find((help) => help.id === favouriteId))
    .filter(Boolean);
  return favouriteHelp;
}
