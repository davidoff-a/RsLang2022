import React from 'react';
import {Button} from '@mui/material';
import {TextField} from '@mui/material';
import {Dialog} from '@mui/material';
import {DialogContent} from '@mui/material';
import {DialogContentText} from '@mui/material';
import {DialogTitle} from '@mui/material';
import { DialogActions } from '@mui/material';


export default function FormDialog({toggleModal}:{toggleModal: (e: React.MouseEvent<Element, MouseEvent>)=>void}) {

  return (
      <>
        <Dialog open={open} onClose={toggleModal} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleModal} color="primary">
              Cancel
            </Button>
            <Button onClick={toggleModal} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </>
  );
}
