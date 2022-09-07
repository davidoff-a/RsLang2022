import Typography from "@mui/material/Typography";

interface Props {
  error?: string;
}

export function ErrorPage({error}: Props) {
  return (
    <Typography variant="h4" gutterBottom>
      {error ? String(error) : "Unknown error!"}
    </Typography>
  );
}
