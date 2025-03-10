import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Paper, Typography } from '@mui/material';

import { useMode } from '../../theme';

interface FilterButtonProps {
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
  const [theme] = useMode();

  return (
    <Paper>
      <Button
        onClick={onClick}
        sx={{
          height: '100%',
          fontSize: '1.6rem',
          fontWeight: '400',
          textTransform: 'none',
          color: '#000',
          backgroundColor: 'white',
          padding: '1.2rem 1.2rem !important',
        }}
      >
        <FilterListIcon />
        <Typography
          sx={{
            marginLeft: '0.5rem',
            [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
              display: 'none',
            },
          }}
        >
          Фильтры
        </Typography>
      </Button>
    </Paper>
  );
};

export default FilterButton;
