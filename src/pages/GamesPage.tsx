import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";

export default function GamesPage() {
  return (
    <Typography variant="h4" component="h1" gutterBottom>
      Games page
      <Outlet />
    </Typography>
  );
}
