import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';

import Calendar from '../Calendar/Calendar';
import { filterOptions } from '../../const/filterOptions';
import { FilterProps } from '../../types/IFilterOption';
import { useMode } from '../../theme';

import AccordionCheckboxes from './AccordionCheckboxes';
import StandardCheckboxes from './StandardCheckboxes';

const Filters: React.FC<FilterProps> = ({ selectedOptions, selectedDate, setSelectedOptions, setSelectedDate }) => {
  const [theme] = useMode();

  // Toggle checkbox filter
  const handleToggle = (props: string): void => {
    setSelectedOptions((prev) => {
      if (prev.includes(props)) {
        return prev.filter((o) => o !== props);
      } else {
        return [...prev, props];
      }
    });
  };

  const handleReset = () => {
    setSelectedOptions([]);
    setSelectedDate(null);
  };

  return (
    <Paper
      sx={{
        backgroundColor: 'white',
        padding: '0 2rem',
        height: 'fit-content',
        width: '320px',
        [`@media (min-width: ${theme.breakpoints.values.md}px) and (max-width: ${1560}px)`]: {
          width: '100%',
        },
        [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
          boxShadow: 'none',
        },
        [`@media (max-width: ${319}px)`]: {
          width: '240px',
        },
      }}
    >
      <Box sx={{ padding: '2rem 0' }}>
        <Typography variant='h6' width='fit-content'>
          Фильтрация
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: '2rem' }}>
          {filterOptions.map((item, index) => {
            if (item.type === 'checkList') {
              return (
                <StandardCheckboxes
                  item={item}
                  index={index}
                  selectedOptions={selectedOptions}
                  handleToggle={handleToggle}
                  key={index}
                />
              );
            } else if (item.type === 'accordionList') {
              return (
                <AccordionCheckboxes
                  item={item}
                  index={index}
                  selectedOptions={selectedOptions}
                  handleToggle={handleToggle}
                  key={index}
                />
              );
            }
            return null;
          })}
        </Box>

        <Box sx={{ marginTop: '2rem' }}>
          <Typography variant='subtitle1' sx={{ opacity: '0.6' }}>
            Помощь актуальна до:
          </Typography>
          <Box sx={{ marginTop: '1rem' }}>
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </Box>
        </Box>

        <Box sx={{ marginTop: '4rem' }}>
          <Button
            disabled={selectedOptions.length === 0}
            onClick={() => handleReset()}
            variant='outlined'
            sx={{
              width: '100%',
              color: 'black',
              borderColor: 'black',
              padding: 1,
            }}
          >
            СБРОСИТЬ
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Filters;
