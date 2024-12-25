import { Button, Paper, Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import React from 'react'

interface FilterButtonProps {
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
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
        <FilterListIcon/>
        <Typography sx={{marginLeft: '0.5rem'}}>
          Фильтры
        </Typography>
      </Button>
    </Paper>
  )
}

export default FilterButton