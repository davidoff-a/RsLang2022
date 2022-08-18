import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import { IWord } from "../../common/interfaces/word";
import { Spinner } from "../../components/Spinner";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  cursor: "pointer",
  color: theme.palette.text.secondary,
}));

interface Props {
  items: IWord[];
  isLoaded: boolean;
  error: string;
  // eslint-disable-next-line no-unused-vars
  onClickItem: (id: string) => void;
}

export function TextbookWords({ items, isLoaded, error, onClickItem }: Props) {
  if (error) {
    return <div>Ошибка: {error}</div>;
  } else if (!isLoaded) {
    return <Spinner />;
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {items.map((item) => (
            <Grid key={item.id} xs={6}>
              <Item onClick={() => onClickItem(item.id)}> {item.word}</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}
