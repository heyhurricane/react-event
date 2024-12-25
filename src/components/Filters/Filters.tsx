import React, { useEffect } from 'react';
// components
import StandardCheckboxes from './StandardCheckboxes';
import AccordionCheckboxes from './AccordionCheckboxes';
import Calendar from '../Calendar/Calendar';
// data
import { filterOptions } from '../../const/filterOptions';
// types
import { FilterProps } from '../../types/IFilterOption';
// styles
import { Box, Button, Paper, Typography } from '@mui/material';
import { useMode } from '../../theme';

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

  // Handle date change
  const handleDateChange = (date: string | null) => {
    if (date) {
      // Set selected options to only include the new date
      setSelectedOptions((prev) => {
        const filteredOptions = prev.filter(
          (option) => !option.match(/^\d{4}-\d{2}-\d{2}$/)
        );
        // Keep only the formatted date
        return [...filteredOptions, date]; 
      });
    } else {
      setSelectedDate(null);
      setSelectedOptions((prev) =>
        prev.filter((option) => !option.match(/^\d{4}-\d{2}-\d{2}$/))
      );
    }
  };

  const handleReset = () => {
    setSelectedOptions([]);
    setSelectedDate(null);
  };

  useEffect(() => {
    if (typeof selectedDate === 'string' || selectedDate === null) {
      handleDateChange(selectedDate);
    }
  }, [selectedDate]);

  return (
    <Paper sx={{ 
      backgroundColor: 'white', 
      padding: '0 2rem', 
      height: 'fit-content', 
      width: '320px',
      [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
        boxShadow: 'none',
      }
    }}>
      <Box sx={{ padding: '2rem 0' }}>
        <Typography variant='h6' width='fit-content'>
          Фильтрация
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: '2rem'}}>
          {filterOptions.map((item, index) => {
            if (item.type === 'checkList') {
              // render standard options
              return (
                <StandardCheckboxes
                  item={item}
                  index={index}
                  selectedOptions={selectedOptions}
                  handleToggle={handleToggle}
                />
              );
            } else if (item.type === 'accordionList') {
              // render options inside accordion
              return (
                <AccordionCheckboxes
                  item={item}
                  index={index}
                  selectedOptions={selectedOptions}
                  handleToggle={handleToggle}
                />
              );
            }
            return null;
          })}
        </Box>

        <Box sx={{ marginTop: '2rem' }}>
          <Typography
            variant="subtitle1"
            sx={{ opacity: '0.6' }}
          >
            Помощь актуальна до:
          </Typography>
          <Box sx={{ marginTop: '1rem' }}>
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Box>
        </Box>

        <Box sx={{ marginTop: '4rem' }}>
          <Button
            disabled={selectedOptions.length === 0}
            onClick={() => handleReset()}
            variant="outlined"
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
