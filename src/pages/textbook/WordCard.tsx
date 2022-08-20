import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { IUserWord } from "../../common/interfaces/userWord";

export interface Props {
  color: string;
  item: IUserWord;
}

export function WordCard({ color, item }: Props) {
  if (!item) {
    return <div></div>;
  } else {
    return (
      <Card sx={{ maxWidth: '22rem',
        height: '24rem',
        boxShadow: `0px 4px 2px -2px ${color},0px 2px 2px 0px ${color},0px 2px 6px 0px ${color}`}}>
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
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }
}
