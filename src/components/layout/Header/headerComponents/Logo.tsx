import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';
import '../_header.scss';

export default function Logo() {
  return (
    <>
      <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
        className={'header-logo'}
        variant="h6"
        noWrap
        component="a"
        href="/home"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'Roboto',
          fontWeight: 700,
          letterSpacing: '.1rem',
          color: 'secondary',
          textDecoration: 'none',
        }}
      >
        RSLang 2022
      </Typography>
    </>
  );
}
