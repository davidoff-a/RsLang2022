import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HeadsetIcon from '@mui/icons-material/Headset';

export interface Props {
  onClickLinkGame: (link: string) => void;
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
        onClick={() => onClickLinkGame("sprint")}
      >
        <DirectionsRunIcon  color="warning" sx={{ mr: 1 }} />
        sprint
      </Fab>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        onClick={() => onClickLinkGame("audiocall")}
      >
        <HeadsetIcon color="warning" sx={{ mr: 1 }} />
        audiocall
      </Fab>
    </Box>
  );
}
