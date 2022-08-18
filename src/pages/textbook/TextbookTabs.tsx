import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export interface Props {
  // eslint-disable-next-line no-unused-vars
  onClickTab: (id: number) => void
}

export function TextbookTabs({onClickTab}: Props) {
  const [value, setValue] = useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        {new Array(7).fill(1).map((_e, id) => (
          <Tab
            key={id}
            label={`${id + 1}`}
            value={`${id + 1}`}
            onClick={() => onClickTab(id)}
          />))}
      </Tabs>
    </Box>
  );
}
