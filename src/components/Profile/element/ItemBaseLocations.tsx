import { Stack } from '@mui/material';

import Row from './Row';
interface IItemBaseLocations {
  district: string;
  city: string;
}
const ItemBaseLocations = ({ district, city }: IItemBaseLocations) => {
  return (
    <Stack gap={'0.4rem'}>
      <Stack direction={'row'} gap={'0.4rem'}>
        <Row header={'Область'} value={district} />
      </Stack>
      <Stack direction={'row'} gap={'0.4rem'}>
        <Row header={'Населенный пункт'} value={city} />
      </Stack>
    </Stack>
  );
};

export default ItemBaseLocations;
