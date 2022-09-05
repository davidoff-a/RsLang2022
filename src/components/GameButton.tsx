import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HeadsetIcon from '@mui/icons-material/Headset';
import { Games } from "../common/enums/games";

export interface Props {
  onClickLinkGame: (game: Games) => void;
}

export function GameButton({ onClickLinkGame }: Props) {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1 },
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        onClick={() => onClickLinkGame(Games.SPRINT)}
      >
        <DirectionsRunIcon  color="warning" sx={{ mr: 1 }} />
        sprint
      </Fab>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        onClick={() => onClickLinkGame(Games.AUDIOCALL)}
      >
        <HeadsetIcon color="warning" sx={{ mr: 1 }} />
        audiocall
      </Fab>
    </Box>
  );
}
