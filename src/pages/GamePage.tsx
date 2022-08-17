import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

export default function GamePage() {
  const params = useParams();
  return (
    <Typography variant="h4" component="h1" gutterBottom>
      Game page {params.gameId}
    </Typography>
  );
}
