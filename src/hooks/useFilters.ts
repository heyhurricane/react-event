import { useEffect, useState } from 'react';

import { applyDate, applyFilter, applySearch } from '../utils/filterUtils';
import { IHelpRequest } from '../types/helpRequest';

import useParseURL from './useParseURL';

interface IUseFilterProps {
  helpRequestsList: IHelpRequest[];
  setIsResetFilters: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useFilters({ helpRequestsList, setIsResetFilters }: IUseFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<IHelpRequest[]>([]);

  useParseURL({
    searchTerm,
    selectedOptions,
    selectedDate,
    setSearchTerm,
    setSelectedOptions,
    setSelectedDate,
  });

  const applyFilters = () => {
    if (!helpRequestsList || helpRequestsList.length === 0) {
      setFilteredData([]);
      return;
    }

    let requestedData = helpRequestsList;

    if (searchTerm) {
      requestedData = applySearch(requestedData, searchTerm);
    }

    if (selectedOptions.length > 0) {
      requestedData = applyFilter(requestedData, selectedOptions);
    }

    if (selectedDate) {
      requestedData = applyDate(requestedData, selectedDate);
    }

    setFilteredData(requestedData);
    setIsResetFilters(true);
  };

  useEffect(() => {
    applyFilters();
  }, [helpRequestsList, searchTerm, selectedOptions, selectedDate]);

  return {
    searchTerm,
    selectedOptions,
    selectedDate,
    filteredData,
    setSearchTerm,
    setSelectedOptions,
    setSelectedDate,
  };
}
