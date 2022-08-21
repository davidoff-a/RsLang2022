import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { IUserWord } from "../../common/interfaces/userWord";
import { Difficulty } from "../../common/enums/difficulty";

export interface Props {
  isLogged: boolean;
  color: string;
  item: IUserWord;
  onClickWordCardButton: (
    isUserWord: boolean,
    id: string,
    difficulty: Difficulty,
    goals: number
  ) => void;
}

export function WordCard({
  isLogged,
  color,
  item,
  onClickWordCardButton,
}: Props) {
  if (!item) {
    return <div></div>;
  } else {
    const isHard: boolean = item.difficulty === Difficulty.HARD;
    const isStudied: boolean = item.difficulty === Difficulty.STUDIED;
    return (
      <Card
        sx={{
          maxWidth: "22rem",
          height: "24rem",
          boxShadow: `0px 4px 2px -2px ${color},0px 2px 2px 0px ${color},0px 2px 6px 0px ${color}`,
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={`${item.image}`}
          alt={`image for "${item.word}"`}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {item.word}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {item.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.transcription}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.wordTranslate}
          </Typography>
        </CardContent>
        <CardActions>
          {isLogged && (
            <>
              {!isStudied && (
                <Button
                  size="small"
                  onClick={() =>
                    onClickWordCardButton(
                      item.isUserWord,
                      item.id,
                      isHard ? Difficulty.EASY : Difficulty.HARD,
                      item.goals
                    )
                  }
                >
                  {isHard ? "Make easy" : "Make hard"}
                </Button>
              )}
              <Button
                size="small"
                onClick={() =>
                  onClickWordCardButton(
                    item.isUserWord,
                    item.id,
                    isStudied ? Difficulty.EASY : Difficulty.STUDIED,
                    item.goals
                  )
                }
              >
                {isStudied ? "Study again" : "Make studied"}
              </Button>
            </>
          )}
        </CardActions>
        <Typography variant="body2" color="text.secondary">
          {item.difficulty}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.isUserWord ? "true" : "false"}
        </Typography>
      </Card>
    );
  }
}
