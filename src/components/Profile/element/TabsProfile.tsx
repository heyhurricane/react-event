import { Box, Tabs, useMediaQuery } from '@mui/material';

import { CustomTab } from './CustomTab';
export function TabsProfile({ value, setValue }) {
  const isSmallScreen = useMediaQuery('(max-width:400px)');

  function handleChange(e: React.SyntheticEvent, numberTab: number) {
    setValue(numberTab);
  }

  return (
    <Box
      sx={{
        padding: '10px 0 0 0',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons={isSmallScreen}
        allowScrollButtonsMobile={isSmallScreen}
        sx={{
          minHeight: 0,
          '& .MuiTabs-scrollButtons': {
            width: '26px',
          },
        }}
      >
        <CustomTab label={'Личные данные'} index={0} />
        <CustomTab label={'Контакты'} index={1} />
        <CustomTab label={'Избранное'} index={2} />
      </Tabs>
    </Box>
  );
}
