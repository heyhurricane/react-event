import { Box, Tabs, useMediaQuery } from '@mui/material';

import CustomTab from './CustomTab';

interface ITabsProfile {
  value: number;
  setValue: (numberTab: number) => void;
}

const TabsProfile: React.FC<ITabsProfile> = ({ value, setValue }) => {
  const isSmallScreen = useMediaQuery('(max-width:400px)');

  function handleChange(e: React.SyntheticEvent, numberTab: number) {
    setValue(numberTab);
  }

  return (
    <Box
      sx={{
        padding: '1rem 0 0 0',
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
            width: '2.6rem',
          },
        }}
      >
        <CustomTab label={'Личные данные'} index={0} />
        <CustomTab label={'Контакты'} index={1} />
        <CustomTab label={'Избранное'} index={2} />
      </Tabs>
    </Box>
  );
};

export default TabsProfile;
