import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Typography,
} from '@mui/material';

import { IUserWord } from '../../../common/interfaces/userWord';
import { Difficulty } from '../../../common/enums/difficulty';
import { Player } from './Player';
export interface Props {
  isLogged: boolean;
  color: string;
  item: IUserWord;
  onClickWordCardButton: (
    isUserWord: boolean,
    id: string,
    difficulty: Difficulty,
    goals: number,
  ) => void;
}

export function WordCard({
  isLogged,
  color,
  item,
  onClickWordCardButton,
}: Props) {
  if (!item) {
    return <></>;
  } else {
    const isHard: boolean = item.difficulty === Difficulty.HARD;
    const isStudied: boolean = item.difficulty === Difficulty.STUDIED;
    // TODO change links to server from public
    return (
      <Card
        sx={{
          maxWidth: '40rem',
          boxShadow: `0px 4px 2px -2px ${color},0px 2px 2px 0px ${color},0px 2px 6px 0px ${color}`,
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={`https://ts-learn-words.herokuapp.com/${item.image}`}
          alt={`image for "${item.word}"`}
        />
        <CardContent>
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={10}>
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                sx={{ marginBottom: '0.25rem', textAlign: 'center' }}
              >
                {item.word}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Player url={`${process.env.PUBLIC_URL}${item.audio}`}></Player>
            </Grid>
            <Grid item xs={5}>
              {' '}
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textAlign: 'right' }}
              >
                {item.transcription}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h6" color="text.secondary">
                {item.wordTranslate}
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: item.textMeaning }}
              />
              <Typography variant="body2">
                {item.textMeaningTranslate}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Player
                url={`${process.env.PUBLIC_URL}${item.audioMeaning}`}
              ></Player>
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: item.textExample }}
              />
              <Typography variant="body2">
                {item.textExampleTranslate}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Player
                url={`${process.env.PUBLIC_URL}${item.audioExample}`}
              ></Player>
            </Grid>
          </Grid>
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
                      item.goals,
                    )
                  }
                >
                  {isHard ? 'Make easy' : 'Make hard'}
                </Button>
              )}
              <Button
                size="small"
                onClick={() =>
                  onClickWordCardButton(
                    item.isUserWord,
                    item.id,
                    isStudied ? Difficulty.EASY : Difficulty.STUDIED,
                    item.goals,
                  )
                }
              >
                {isStudied ? 'Study again' : 'Make studied'}
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    );
  }
}