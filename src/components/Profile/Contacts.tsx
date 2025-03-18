import { Box, Stack, Typography } from '@mui/material';

import { useAppSelector } from '../../hooks/useAppSelector';
import { getProfileData } from '../../store/userProfile/profileSelectors';

import ItemSocial from './element/ItemSocial';
import Vk from './element/Vk';
import WhatsApp from './element/WhatsApp';
import Telegram from './element/Telegram';

const Contacts = () => {
  const { data } = useAppSelector(getProfileData);

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'3rem'} marginTop={'3rem'}>
      <Stack gap={'1rem'} alignItems={'flex-start'}>
        <Typography variant='h6'>E-mail</Typography>
        <Typography>{data.contacts.email}</Typography>
      </Stack>
      <Stack gap={'1rem'} alignItems={'flex-start'}>
        <Typography variant='h6'>Телефон</Typography>
        <Typography>{data.contacts.phone}</Typography>
      </Stack>
      <Stack gap={'1rem'} alignItems={'flex-start'}>
        <Typography variant='h6'>Социальные сети</Typography>
        <Stack gap={'0.6rem'}>
          <ItemSocial name='VKontakte' link={`https://vk.com/${data.contacts.social.vk}`} icon={<Vk />} />
          <ItemSocial name='Telegram' link={`https://t.me/${data.contacts.social.telegram}`} icon={<Telegram />} />
          <ItemSocial name='WhatsApp' link={`https://wa.me/${data.contacts.social.whatsapp}`} icon={<WhatsApp />} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Contacts;
