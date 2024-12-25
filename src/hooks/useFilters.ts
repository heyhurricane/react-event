import { useEffect, useState } from 'react';
import { HelpRequest } from '../types/HelpRequest';
import { applyFilter, applySearch } from '../utils/filterUtils';

type useFilterProps = {
  helpRequestsList: HelpRequest[];
};

export function useFilters({ helpRequestsList }: useFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredData, setFilteredData] = useState<HelpRequest[]>([]);

  const filterHelpRequests = () => {
    const filterHelpRequests = () => {
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

      setCurrentPage(1);
      setFilteredData(requestedData);
    };
    filterHelpRequests();
  };

  useEffect(() => {
    filterHelpRequests();
  }, [helpRequestsList, searchTerm, selectedOptions]);

  return {
    searchTerm,
    selectedOptions,
    selectedDate, 
    currentPage,
    filteredData,
    setSearchTerm,
    setSelectedOptions,
    setSelectedDate,
    setCurrentPage,
  };
}