export const getCurrentPageParameterURL = () => {
  const params = new URLSearchParams(location.search);
  const urlCurrentPage = parseInt(params.get('currentPage') || '1', 10);
  return urlCurrentPage;
};

export const clearAllParametersURL = () => {
  const params = new URLSearchParams(window.location.search);

  params.forEach((value, key) => {
    params.delete(key);
  });

  const newUrl = window.location.pathname + window.location.hash;
  window.history.replaceState({}, '', newUrl);
};
