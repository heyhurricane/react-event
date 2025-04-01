import { Box } from '@mui/material';
import { FC } from 'react';

import { useMode } from '../../theme';
import ViewToggle from '../ViewToggle/ViewToggle';
import { useViewMode } from '../../hooks/useViewMode';
import { useResponsiveItemsPerPage } from '../../hooks/useResponsiveItemsPerPage';
import { getTabProfile } from '../../store/viewSettings/viewSettingsSelectors';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setTabProfile } from '../../store/viewSettings/viewSettingsSlice';
import { useProfileURLHandler } from '../../hooks/useProfileURLHandler';

import TabsProfile from './element/TabsProfile';
import PagesProfile from './PagesProfile';
import PersonalData from './PersonalData';
import Favourites from './Favourites';
import Contacts from './Contacts';

const TabsPropfile: FC = () => {
  const dispatch = useAppDispatch();
  const [theme] = useMode();
  const { viewMode, handleViewChange } = useViewMode();
  const itemsPerPage = useResponsiveItemsPerPage();

  const numberTab = useAppSelector(getTabProfile);
  const setNumberTab = (numberTab: number) => {
    dispatch(setTabProfile(numberTab));
  };

  useProfileURLHandler(numberTab, setNumberTab);

  return (
    <Box
      bgcolor={'white'}
      width={'100%'}
      minHeight={'60vh'}
      border={`1px solid ${theme.palette.grey[300]}`}
      borderRadius={'0.4rem'}
      padding={'0 3rem 4rem 3rem'}
      sx={{
        [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
          padding: '0 2rem 4rem 2rem',
        },
      }}
    >
      <Box display={'flex'} flexDirection={'row'} width={'100%'} justifyContent={'space-between'} marginTop={'12px'}>
        <Box width={'72%'}>
          <TabsProfile value={numberTab} setValue={setNumberTab} />
        </Box>
        {numberTab === 2 && <ViewToggle viewMode={viewMode} onOptionChange={handleViewChange} />}
      </Box>
      <PagesProfile value={numberTab} index={0}>
        <PersonalData />
      </PagesProfile>
      <PagesProfile value={numberTab} index={1}>
        <Contacts />
      </PagesProfile>
      <PagesProfile value={numberTab} index={2}>
        <Favourites viewMode={viewMode} customNumberItemsPerPage={itemsPerPage} />
      </PagesProfile>
    </Box>
  );
};

export default TabsPropfile;
