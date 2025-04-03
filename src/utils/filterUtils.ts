/* eslint-disable prettier/prettier */

import { IHelpRequest } from "../types/IHelpRequest";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applySearch(data: any[], searchTerm: string) {
  return data.filter(
    (request) =>
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.organization.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debouncedFunction = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyDate = (data: any[], selectedDate: string | null) => {
  return data.filter((request) => (selectedDate ? new Date(request.endingDate) <= new Date(selectedDate) : true));
};

export function applyFilter(data: IHelpRequest[], selectedOptions: string[]) {
  if (selectedOptions.length === 0) {
    return data;
  }

  let filteredData: IHelpRequest[] = [...data];

  const selectedRequesterTypes = selectedOptions.filter(option => option === 'person' || option === 'organization');
  const selectedHelpTypes = selectedOptions.filter(option => option === 'finance' || option === 'material');
  const selectedQualifications = selectedOptions.filter(option => option === 'professional' || option === 'common');
  const selectedOnlineStatuses = selectedOptions.filter(option => option === 'true' || option === 'false');
  const selectedHelperTypes = selectedOptions.filter(option => option === 'group' || option === 'single');

  // Only filter by a category if only one option is selected for that category
  const shouldFilterRequesterType = selectedRequesterTypes.length === 1;
  const shouldFilterHelpType = selectedHelpTypes.length === 1;
  const shouldFilterQualification = selectedQualifications.length === 1;
  const shouldFilterOnlineStatus = selectedOnlineStatuses.length === 1;
  const shouldFilterHelperType = selectedHelperTypes.length === 1;

  if (shouldFilterRequesterType) {
    filteredData = filteredData.filter((request) => {
      return selectedRequesterTypes.includes(request.requesterType);
    });
  }

  if (shouldFilterHelpType) {
    filteredData = filteredData.filter((request) => {
      return selectedHelpTypes.includes(request.helpType);
    });
  }

  if (shouldFilterQualification) {
    filteredData = filteredData.filter((request) => {
      return selectedQualifications.includes(request.helperRequirements.qualification);
    });
  }

  if (shouldFilterOnlineStatus) {
    filteredData = filteredData.filter((request) => {
      return selectedOnlineStatuses.includes(request.helperRequirements.isOnline.toString() as "true" | "false");
    });
  }

  if (shouldFilterHelperType) {
    filteredData = filteredData.filter((request) => {
      return selectedHelperTypes.includes(request.helperRequirements.helperType);
    });
  }

  return filteredData;
};