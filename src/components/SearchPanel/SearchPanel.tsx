import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Box, InputBase, Paper, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { debouncedFunction } from '../../utils/filterUtils';
import { useMode } from '../../theme';

interface ISearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchPanel: FC<ISearchProps> = ({ searchTerm, setSearchTerm }) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const [theme] = useMode();

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
    },
    [setSearchTerm],
  );

  const debouncedSearch = useRef<(value: string) => void>(debouncedFunction(handleSearch, 250));

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedSearch.current?.(newValue);
  }, []);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  return (
    <Paper
      sx={{
        width: '100%',
      }}
    >
      <Stack
        sx={{
          backgroundColor: 'white',
          gap: '2rem',
          padding: '2rem',
          mb: '1.6rem',
          [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
            padding: '1.6rem',
            mb: '0',
          },
        }}
      >
        <Typography
          variant='h6'
          sx={{
            display: 'flex',
            width: 'fit-content',
            [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
              display: 'none',
            },
          }}
        >
          Найти запрос
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid gray' }}>
          <SearchIcon sx={{ position: 'absolute', color: 'gray' }} />
          <InputBase
            placeholder='Введите название задачи или организации'
            value={inputValue}
            onChange={handleInputChange}
            sx={{
              width: '100%',
              fontSize: '1.6rem',
              paddingLeft: '2.5rem',
              [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                fontSize: '1.4rem',
              },
              [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
                fontSize: '1.3rem',
              },
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default memo(SearchPanel);
