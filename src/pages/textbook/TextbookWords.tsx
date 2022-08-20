import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import { Spinner } from "../../components/Spinner";
import { IUserWord } from "../../common/interfaces/userWord";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  cursor: "pointer",
  color: theme.palette.text.secondary,
}));

interface Props {
  items: IUserWord[];
  isLoaded: boolean;
  error: string;
  color: string;
  onClickItem: (id: string) => void;
}

export function TextbookWords({ items, isLoaded, error, color, onClickItem }: Props) {
  if (error) {
    return <div key={0}>Error: {error}</div>;
  } else if (!isLoaded) {
    return <Spinner />;
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {items.map((item) => (
            <Grid key={item.id} xs={6}>
              <Item 
                sx={{boxShadow: `0px 4px 2px -2px ${color},0px 2px 2px 0px ${color},0px 2px 6px 0px ${color}`}}
                onClick={() => onClickItem(item.id)}> {item.word}</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}
