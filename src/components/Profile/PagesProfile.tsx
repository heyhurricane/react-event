import { Box } from '@mui/material';
import React from 'react';

interface IPagesProfile {
  children: React.ReactNode;
  index: number;
  value: number;
}

export default function PagesProfile(props: IPagesProfile) {
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
}
