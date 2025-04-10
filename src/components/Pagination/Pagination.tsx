import { Box, Pagination as MuiPagination } from '@mui/material';
import { FC, memo } from 'react';

interface IPagination {
  totalPages: number;
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  size: 'small' | 'medium' | 'large';
  hidePrevButton: boolean;
  hideNextButton: boolean;
}

const Pagination: FC<IPagination> = ({
  totalPages,
  currentPage,
  handlePageChange,
  size,
  hideNextButton,
  hidePrevButton,
}) => {
  console.log('<Pagination/> Render');
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
      }}
    >
      <MuiPagination
        count={totalPages}
        page={currentPage}
        size={size}
        onChange={handlePageChange}
        hidePrevButton={hidePrevButton}
        hideNextButton={hideNextButton}
        color='primary'
      />
    </Box>
  );
};

export default memo(Pagination);
