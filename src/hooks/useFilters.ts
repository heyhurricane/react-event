import { useCallback, useEffect, useMemo, useState } from 'react';

import { applyDate, applyFilter, applySearch } from '../utils/filterUtils';
import { IHelpRequest } from '../types/IHelpRequest';

import useParseURL from './useParseURL';

interface IUseFilterProps {
  helpRequestsList: IHelpRequest[];
  setIsResetFilters: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useFilters({ helpRequestsList, setIsResetFilters }: IUseFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useParseURL({
    searchTerm,
    selectedOptions,
    selectedDate,
    setSearchTerm,
    setSelectedOptions,
    setSelectedDate,
  });

  const applyFilters = useCallback(() => {
    if (!helpRequestsList || helpRequestsList.length === 0) {
      return [];
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

    return requestedData;
    //setIsResetFilters(true);
  }, [helpRequestsList, searchTerm, selectedOptions, selectedDate]);

  //useEffect(() => {
  //  applyFilters();
  //}, [helpRequestsList, searchTerm, selectedOptions, selectedDate]);

  // Кешируем отфильтрованные данные
  const filteredData = useMemo(() => applyFilters(), [applyFilters]);

  // Запоминаем setSelectedOptions, чтобы не пересоздавался в FiltersBlock
  const stableSetSelectedOptions = useCallback(setSelectedOptions, []);

  return {
    searchTerm,
    selectedOptions,
    selectedDate,
    filteredData,
    setSearchTerm,
    setSelectedOptions: stableSetSelectedOptions,
    setSelectedDate,
  };
}
