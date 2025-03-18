import { Stack, Box, Link } from '@mui/material';

interface IItemSocial {
  name: string;
  link: string;
  icon: JSX.Element;
}

const ItemSocial = ({ name, link, icon }: IItemSocial) => {
  return (
    <Stack display={'flex'} direction={'row'} gap={'3.2rem'} alignItems={'center'}>
      <Box width={'2.4rem'} height={'2.4rem'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Box sx={{ width: '100%', height: '100%', objectFit: 'contain' }}>{icon}</Box>
      </Box>
      <Link
        href={`${link}`}
        target='_blank'
        underline='hover'
        sx={{
          color: 'black',
          '&:hover': { color: 'black' },
        }}
      >
        {name}
      </Link>
    </Stack>
  );
};

export default ItemSocial;
