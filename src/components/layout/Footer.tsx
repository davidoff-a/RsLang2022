import { useState } from 'react';

import { Box, CardMedia, Container, Link, Typography, Avatar, AvatarGroup, CssBaseline, Modal } from '@mui/material';

interface Props {
  onOpen: (name: string) => void;
}

function Copyright() {
  return (
    <Typography sx={{ display: 'flex', alignItems: 'center' }} variant="h6" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://rs.school/js/">
        <img height="40" src={`${process.env.PUBLIC_URL}rs_school.svg`} alt={'RS School'} />
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

function TeamsIcons({ onOpen }: Props) {
  return (
    <AvatarGroup>
      <Avatar
        sx={{ cursor: 'pointer' }}
        component="button"
        onClick={() => onOpen('alexey')}
        alt="Alexey"
        src={`${process.env.PUBLIC_URL}alexey.jpg`}
      />
      <Avatar
        sx={{ cursor: 'pointer' }}
        component="button"
        onClick={() => onOpen('elvira')}
        alt="Elvira"
        src={`${process.env.PUBLIC_URL}elvira.jpg`}
      />
      <Avatar
        sx={{ cursor: 'pointer' }}
        component="button"
        onClick={() => onOpen('sergey')}
        alt="Sergey"
        src={`${process.env.PUBLIC_URL}sergey.jpg`}
      />
    </AvatarGroup>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

function ModalWrapper() {
  const [open, setOpen] = useState(false);
  const [partner, setРartner] = useState({
    name: '',
    description: '',
    image: '',
    git: '',
  });

  const handleOpen = (name: string) => {
    setOpen(true);
    if (name === 'alexey') {
      setРartner({
        name: 'Alexey',
        description: 'team leader, authorization, server',
        image: `${process.env.PUBLIC_URL}alexey.jpg`,
        git: 'https://github.com/davidoff-a',
      });
    } else if (name === 'elvira') {
      setРartner({
        name: 'Elvira',
        description: 'game sprint',
        image: `${process.env.PUBLIC_URL}elvira.jpg`,
        git: 'https://github.com/Elvira-g',
      });
    } else if (name === 'sergey') {
      setРartner({
        name: 'Sergey',
        description: 'main page, textbook, dictionary, statistics, header, footer, change theme',
        image: `${process.env.PUBLIC_URL}sergey.jpg`,
        git: 'https://github.com/bongoman-by',
      });
    }
  };

  const handleClose = () => setOpen(false);
  const { name, description, image, git } = partner;
  return (
    <>
      <TeamsIcons onOpen={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {name}
          </Typography>
          <Link color="inherit" href={git}>
            <CardMedia sx={{ borderRadius: '50%' }} component="img" image={image} alt={name} />
          </Link>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default function Footer() {
  return (
    <>
      {' '}
      <CssBaseline />
      <Container component="main" sx={{ mt: '2rem', mb: '1rem' }} maxWidth="md">
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            my: 4,
            backgroundColor: theme =>
              theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Copyright />
          <ModalWrapper />
        </Box>
      </Container>
    </>
  );
}
