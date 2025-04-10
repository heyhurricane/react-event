import { Box, Button, Paper, Typography } from '@mui/material';
import { FC, memo, useCallback } from 'react';

import { filterOptionsConst } from '../../constants/filterOptionsConst';
import { IFilterProps } from '../../types/IFilterOption';
import { useMode } from '../../theme';

import Calendar from './Calendar';
import AccordionCheckboxes from './AccordionCheckboxes';
import StandardCheckboxes from './StandardCheckboxes';

const FiltersBlock: FC<IFilterProps> = ({ selectedOptions, selectedDate, setSelectedOptions, setSelectedDate }) => {
  const [theme] = useMode();
  console.log('<FiltersBlock /> Render');
  // Toggle checkbox filter
  const toggleFilterOption = useCallback(
    (props: string): void => {
      setSelectedOptions((prev) => (prev.includes(props) ? prev.filter((o) => o !== props) : [...prev, props]));
    },
    [setSelectedOptions],
  );

  const handleReset = () => {
    setSelectedOptions([]);
    setSelectedDate(null);
  };

  const paperStyles = {
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
  };

  return (
    <Paper sx={paperStyles}>
      <Box sx={{ padding: '2rem 0' }}>
        <Typography variant='h6' width='fit-content'>
          Фильтрация
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: '2rem' }}>
          {filterOptionsConst.map((item, index) => {
            if (item.type === 'checkList') {
              return (
                <StandardCheckboxes
                  item={item}
                  index={index}
                  selectedOptions={selectedOptions}
                  toggleFilterOption={toggleFilterOption}
                  key={index}
                />
              );
            } else if (item.type === 'accordionList') {
              return (
                <AccordionCheckboxes
                  item={item}
                  index={index}
                  selectedOptions={selectedOptions}
                  toggleFilterOption={toggleFilterOption}
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
            onClick={handleReset}
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

const Filters = memo(FiltersBlock);
export default Filters;
