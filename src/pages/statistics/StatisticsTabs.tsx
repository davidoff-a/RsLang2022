import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
interface Props {
  statisticsTubs: string[];
  onClickTab: (id: number) => void;
}

export function StatisticsTabs({
  statisticsTubs,
  onClickTab,
}: Props) {
  const [value, setValue] = useState("1");
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        sx={{
          "& .MuiTabs-flexContainer": {
            padding: "10px",
            columnGap: "10px",
          },
        }}
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        centered={true}
        aria-label="secondary tabs"
      >
        {statisticsTubs.map((title, id) => (
          <Tab
            key={id}
            label={title}
            value={`${id + 1}`}
            onClick={() => onClickTab(id)}
          />
        ))}
      </Tabs>
    </Box>
  );
  
}
