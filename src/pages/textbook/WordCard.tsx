import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { IWord } from "../../common/interfaces/word";

export interface Props {
  item: IWord;
}

export function WordCard({ item }: Props) {
  if (!item) {
    return <div></div>;
  } else {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={`${item.image}`}
          alt={`image for "${item.word}"`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${item.word}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            `${item.transcription}`
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }
}
