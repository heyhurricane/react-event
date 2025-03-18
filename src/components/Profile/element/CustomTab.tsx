import { Tab } from '@mui/material';

import { useMode } from '../../../theme';

const CustomTab = ({ label, index, ...props }) => {
  const [theme] = useMode();

  return (
    <Tab
      label={label}
      {...a11yProps(index)}
      {...props}
      sx={{
        paddingTop: '0',
        minHeight: 0,
        borderBottom: 1,
        borderColor: 'divider',
        fontSize: '1.4rem',
        [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
          fontSize: '1.2rem',
        },
        [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
          fontSize: '1.1rem',
        },
        [`@media (max-width:${470}px)`]: {
          padding: '1rem 0',
        },
        [`@media (max-width:${400}px)`]: {
          width: '100%',
        },
      }}
    />
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default CustomTab;
