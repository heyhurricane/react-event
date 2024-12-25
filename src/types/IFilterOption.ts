export interface IAccordion {
  title: string; // Title for each accordion item
  options: {
    label: string; // Display label for the option
    prop: string; // Corresponding property for filtering
  }[];
};

export type FilterType = 'checkList' | 'accordionList';

export interface IFilterOptionBase {
  type: FilterType;
  title?: string;
};

export interface IStandardFilterOption extends IFilterOptionBase {
  options: { label: string; prop: string }[];
  accordion?: never; 
};

export interface IAccordionFilterOption extends IFilterOptionBase {
  options?: never;
  accordion: {
    accordionTitle: string;
    items: IAccordion[];
  };
};

export type FilterProps = {
  selectedOptions: string[];
  selectedDate: string | null;
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
};

export type IFilterOption = IStandardFilterOption | IAccordionFilterOption;