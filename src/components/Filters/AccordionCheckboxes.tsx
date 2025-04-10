// styles
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import React, { FC, memo, useState } from 'react';

import { FilterOption } from '../../types/IFilterOption';

interface IAccordionCheckboxesProps {
  item: FilterOption;
  index: number;
  selectedOptions: string[];
  toggleFilterOption: (props: string) => void;
}

const AccordionCheckboxes: FC<IAccordionCheckboxesProps> = ({ item, index, selectedOptions, toggleFilterOption }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  console.log('<AccordionCheckboxes /> Render');
  const toggleAccordion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!item.accordion) {
    return null;
  }

  const { accordionTitle, items } = item.accordion;

  const labelStyles = {
    width: 'fit-content',
    hyphens: 'auto',
    wordBreak: 'break-word',
    userSelect: 'none',
    '& .MuiFormControlLabel-label': {
      fontSize: '1.6rem',
    },
  };

  return (
    <Accordion
      key={index}
      expanded={expanded === accordionTitle}
      onChange={toggleAccordion(accordionTitle)}
      sx={{
        margin: 0,
        '&.Mui-expanded': {
          margin: 0,
        },
        '& .MuiAccordion-root': {},
      }}
    >
      <AccordionSummary
        aria-controls={`${accordionTitle}-content`}
        id={`${accordionTitle}-header`}
        sx={{
          '&.Mui-expanded': {
            minHeight: '4.8rem',
            height: '4.8rem',
          },
          height: '4.8rem',
        }}
      >
        <Typography sx={{ ml: '2rem', fontSize: '1.6rem' }}>{accordionTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: '#F5F5F5' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: '2rem' }}>
          {items.map((subItem) => (
            <Box key={subItem.title} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='subtitle1' sx={{ opacity: '0.6', fontSize: '1.6rem' }}>
                {subItem.title}
              </Typography>
              {subItem.options.map(({ label, prop }) => (
                <Box sx={{ ml: '1.2rem' }} key={prop}>
                  <FormControlLabel
                    key={prop}
                    control={
                      <Checkbox checked={selectedOptions.includes(prop)} onChange={() => toggleFilterOption(prop)} />
                    }
                    label={label}
                    sx={labelStyles}
                  />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(AccordionCheckboxes);
