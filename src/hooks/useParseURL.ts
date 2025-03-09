import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type useParseURLProps = {
  searchTerm?: string;
  selectedOptions?: string[];
  selectedDate?: string | null;
  currentPage?: number;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
  setSelectedOptions?: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedDate?: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
};

const useParseURL = (props: useParseURLProps) => {
  const {
    searchTerm,
    selectedOptions,
    selectedDate,
    currentPage,
    setSearchTerm,
    setSelectedOptions,
    setSelectedDate,
    setCurrentPage,
  } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);

    const urlSearchTerm = params.get('searchTerm') || '';
    const urlSelectedOptions = params.getAll('selectedOption');
    const urlSelectedDate = params.get('selectedDate') || null;
    const urlCurrentPage = parseInt(params.get('currentPage') || '1', 10);

    const parseSearchTerm = () => {
      if (urlSearchTerm && urlSearchTerm !== searchTerm && setSearchTerm) {
        setSearchTerm(urlSearchTerm);
      }
    };

    const parseSelectedOptions = () => {
      if (urlSelectedOptions && urlSelectedOptions.length > 0) {
        if (urlSelectedOptions !== selectedOptions && setSelectedOptions) {
          setSelectedOptions(urlSelectedOptions);
        }
      }
    };

    const parseSelectedDate = () => {
      if (urlSelectedDate && urlSelectedDate !== selectedDate && setSelectedDate) {
        setSelectedDate(urlSelectedDate);
      }
    };

    const parseCurrentPage = () => {
      if (urlCurrentPage && urlCurrentPage !== currentPage && setCurrentPage) {
        setCurrentPage(urlCurrentPage);
      }
    };

    parseSearchTerm();
    parseSelectedOptions();
    parseSelectedDate();
    parseCurrentPage();
  };

  const updateFiltersInURL = () => {
    const params = new URLSearchParams(window.location.search);

    const updateSearchTermURL = () => {
      if (searchTerm) params.set('searchTerm', searchTerm);
      else if (searchTerm === '') params.delete('searchTerm');
    };

    const updateSelectedOptionsURL = () => {
      if (selectedOptions) {
        params.delete('selectedOption');
        selectedOptions.forEach((option) => params.append('selectedOption', option));
      } else {
        params.delete('selectedOption');
      }
    };

    const updateSelectedDateURL = () => {
      if (selectedDate) params.set('selectedDate', selectedDate);
      else if (selectedDate === null || undefined) params.delete('selectedDate');
    };

    const updateCurrentPageURL = () => {
      if (currentPage) params.set('currentPage', currentPage.toString());
    };

    updateSearchTermURL();
    updateSelectedOptionsURL();
    updateSelectedDateURL();
    updateCurrentPageURL();

    const currentUrl = new URL(window.location.href);
    const newUrl = new URL(window.location.origin + window.location.pathname + '?' + params.toString());

    if (currentUrl.search !== newUrl.search) {
      navigate({ search: params.toString() }, { replace: true });
    }
  };

  useEffect(() => {
    getQueryParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateFiltersInURL();
  }, [searchTerm, selectedOptions, selectedDate, currentPage]);
};

export default useParseURL;

export const deleteParametersURL = () => {
  const params = new URLSearchParams(window.location.search);

  params.forEach((value, key) => {
    params.delete(key);
  });

  const newUrl = window.location.pathname + window.location.hash;
  window.history.replaceState({}, '', newUrl);
};
