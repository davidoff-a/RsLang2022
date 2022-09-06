import { Box, Container, Link, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        RSS
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function Footer() {
  return (
    <>
      {" "}
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Footer
          </Typography>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
