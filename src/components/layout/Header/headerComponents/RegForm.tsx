// import React, { ChangeEvent } from "react";
import { Button } from "@mui/material";
// import { TextField } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogActions } from "@mui/material";
// import { query } from "../../../../service/API";

export function FormDialog({
  toggleModal,
  open,
}: {
  toggleModal: () => void;
  open: boolean;
}) {
  // const formFieldsData = [
  //   { id: "name", label: "Your Name*", type: "text" },
  //   { id: "email", label: "Your Email*", type: "email" },
  //   { id: "password", label: "Enter Password*", type: "password" },
  //   { id: "pass-verify", label: "Repeat your password*", type: "password" },
  // ];

  // const handleFieldChange = (e: ChangeEvent) => {
  //   const target = e.target as HTMLInputElement;
  //   const propName = target.getAttribute("id") as string;
  //
  //   if (target.value.length > 0) {
  //     setCredentials({ ...credentials, [propName]: target.value });
  //   }
  // };

  // const formFields = formFieldsData.map(({ id, label, type }) => {
  //   return (
  //     <TextField
  //       autoFocus
  //       margin="dense"
  //       id={id}
  //       label={label}
  //       type={type}
  //       fullWidth
  //       key={id}
  //       name={id}
  //       onChange={(e: ChangeEvent) => handleFieldChange(e)}
  //     />
  //   );
  // });

  return (
    <>
      <Dialog
        open={open}
        onClose={toggleModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <form action="#">
          <DialogContent>
            <DialogContentText>Enter your credentials</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleModal} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              SignUp
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}