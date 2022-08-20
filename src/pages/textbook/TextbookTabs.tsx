import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface Props {
  initialGroup: number;
  groupsColor: string[];
  isLogged: boolean;
  onClickTab: (id: number) => void;
}

export function TextbookTabs({ initialGroup, groupsColor, isLogged, onClickTab }: Props) {
  const [value, setValue] = useState(`${initialGroup + 1}`);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        sx={{
          '& .MuiTabs-flexContainer': {
            columnGap: "10px",
          },

        }}
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        centered={true}
        aria-label="secondary tabs example"
      >
        {groupsColor.filter((color, id) => isLogged ? true : id !== 6).map((color, id) => (
          <Tab
            sx={{
              backgroundColor: color,
              borderRadius: "25%",
            }}
            key={id}
            label={`${id === 6 ? 'dificult words' : id + 1}`}
            value={`${id + 1}`}
            onClick={() => onClickTab(id)}
          />
        ))}
      </Tabs>
    </Box>
  );
}
