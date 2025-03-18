import { Stack, Typography } from '@mui/material';

interface IRow {
  header: string;
  value: string;
}
const Row = ({ header, value }: IRow) => {
  return (
    <Stack direction={'row'} gap={'0.4rem'}>
      <Typography fontWeight={'500'}>{header}:</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
};

export default Row;
