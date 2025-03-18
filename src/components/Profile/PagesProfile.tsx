import React from 'react';
import { Box } from '@mui/material';

interface IPagesProfile {
  children: React.ReactNode;
  index: number;
  value: number;
}

const PagesProfile = (props: IPagesProfile) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        height: '100%',
      }}
    >
      {value === index && (
        <Box display={'flex'} flexDirection={'column'} height={'100%'}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default PagesProfile;
