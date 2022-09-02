import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import BoltIcon from "@mui/icons-material/Bolt";
import AddReactionIcon from "@mui/icons-material/AddReaction";

import { Spinner } from "../../../components/Spinner";
import { IUserWord } from "../../../common/interfaces/userWord";
import { Difficulty } from "../../../common/enums/difficulty";
import { GridItem as Item } from "../../../components/GridItem";
interface Props {
  items: IUserWord[];
  isLoaded: boolean;
  isLogged: boolean;
  error: string;
  color: string;
  colorHard: string;
  colorStudied: string;
  isHardWords: boolean;
  isStudiedWords: boolean;
  onClickItem: (id: string) => void;
}

export function TextbookWords({
  items,
  isLoaded,
  isLogged,
  error,
  color,
  colorHard,
  colorStudied,
  isHardWords,
  isStudiedWords,
  onClickItem,
}: Props) {
  const words = (wordsArr: IUserWord[]) =>
    wordsArr.map((word) => (
      <Grid key={word.id} xs={6}>
        <Item
          sx={{
            boxShadow: `0px 4px 2px -2px ${color},0px 2px 2px 0px ${color},0px 2px 6px 0px ${color}`,
            fontWeight: 500,
            fontSize: "1rem",
            cursor: "pointer",
          }}
          onClick={() => onClickItem(word.id)}
        >
          {" "}
          {word.word}
          {isLogged && !isHardWords && word.difficulty === Difficulty.HARD && (
            <BoltIcon sx={{ color: colorHard, fontSize: "1rem" }} />
          )}
          {isLogged &&
            !isStudiedWords &&
            word.difficulty === Difficulty.STUDIED && (
              <AddReactionIcon sx={{ color: colorStudied, fontSize: "1rem" }} />
            )}
        </Item>
      </Grid>
    ));

  if (error) {
    // return <div key={0}>Error: {error.message}</div>;
    console.log("#### error =>", error);
  }
  // else
  if (!isLoaded) {
    return <Spinner />;
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {words(items)}
        </Grid>
      </Box>
    );
  }
}