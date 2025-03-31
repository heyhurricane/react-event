import { useState, useEffect } from 'react';

import { clearAllParametersURL, getCurrentPageParameterURL } from '../utils/urlUtils';

export const useProfileURLHandler = (numberTab: number, setNumberTab: (numberTab: number) => void) => {
  const [isURLParsingEnabled, setIsURLParsingEnabled] = useState<boolean>(numberTab === 2);
  const urlCurrentPage = getCurrentPageParameterURL();

  useEffect(() => {
    setIsURLParsingEnabled(numberTab === 2);
  }, [numberTab]);

  useEffect(() => {
    if (!isURLParsingEnabled) {
      clearAllParametersURL();
    }
  }, [isURLParsingEnabled]);

  useEffect(() => {
    if (urlCurrentPage > 1) {
      setNumberTab(2);
    }
  }, []);
};
