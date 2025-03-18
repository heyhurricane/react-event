import { Stack } from '@mui/material';

import Row from './Row';

interface IItemEducation {
  organizationName: string;
  level: string;
  graduationYear: number;
}
const ItemEducation = ({ organizationName, level, graduationYear }: IItemEducation) => {
  return (
    <Stack gap={'0.4rem'}>
      <Stack direction={'row'} gap={'0.4rem'}>
        <Row header={'Учреждение'} value={organizationName} />
      </Stack>
      <Stack direction={'row'} gap={'0.4rem'}>
        <Row header={'Уровень образования'} value={level} />
      </Stack>
      <Stack direction={'row'} gap={'0.4rem'}>
        <Row header={'Год окончания'} value={String(graduationYear)} />
      </Stack>
    </Stack>
  );
};

export default ItemEducation;
