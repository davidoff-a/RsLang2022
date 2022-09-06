import { SyntheticEvent, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
interface Props {
  initialGroup: number;
  groupsColor: string[];
  onClickTab: (id: number) => void;
}

export function TextbookTabs({ initialGroup, groupsColor, onClickTab }: Props) {
  const [value, setValue] = useState(`${initialGroup + 1}`);
  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const getTabLabel = (id: number): string => {
    return `${id > 5 ? (id === 6 ? 'hard words' : 'studied words') : id + 1}`;
  };

  const tab = (colors: string[]) => {
    return colors.map((color, id) => {
      return (
        <Tab
          sx={{
            boxShadow: `0px 4px 2px -2px ${color},0px 2px 2px 0px ${color},0px 2px 6px 0px ${color}`,
            borderRadius: '50%',
            minWidth: '48px',
          }}
          key={id}
          label={getTabLabel(id)}
          value={`${id + 1}`}
          onClick={() => onClickTab(id)}
        />
      );
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        sx={{
          '& .MuiTabs-flexContainer': {
            padding: '10px',
            columnGap: '10px',
          },
        }}
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        centered={true}
        aria-label="secondary tabs example"
      >
        {tab(groupsColor)}
      </Tabs>
    </Box>
  );
}
