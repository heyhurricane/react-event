// types
import { FC, memo } from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

import { FilterOption } from '../../types/IFilterOption';
// styles

interface IStandardCheckboxesProps {
  item: FilterOption;
  index: number;
  selectedOptions: string[];
  toggleFilterOption: (props: string) => void;
}

const StandardCheckboxesBlock: FC<IStandardCheckboxesProps> = ({
  item: { title, options },
  index,
  selectedOptions,
  toggleFilterOption,
}) => {
  console.log('<StandardCheckboxesBlock /> Render');
  const labelStyles = {
    width: 'fit-content',
    hyphens: 'auto',
    wordBreak: 'break-word',
    userSelect: 'none',
    '& .MuiFormControlLabel-label': {
      fontSize: '1.6rem',
    },
  };

  if (!options) {
    return null;
  }

  return (
    <Box key={index}>
      <Typography variant='subtitle1' sx={{ opacity: '0.6', fontSize: '1.6rem' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: '1.2rem' }}>
        {options.map(({ label, prop }) => (
          <FormControlLabel
            key={prop}
            control={<Checkbox checked={selectedOptions.includes(prop)} onChange={() => toggleFilterOption(prop)} />}
            label={label}
            sx={labelStyles}
          />
        ))}
      </Box>
    </Box>
  );
};

const StandardCheckboxes = memo(StandardCheckboxesBlock);
export default StandardCheckboxes;
