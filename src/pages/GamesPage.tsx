import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";

export function GamesPage() {
  return (
    <Typography variant="h3" gutterBottom>
      Games page
      <Outlet />
    </Typography>
  );
}
