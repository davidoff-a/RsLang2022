// import React, { ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";
// import { TextField } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogActions } from "@mui/material";
import { ChangeEvent, useState } from "react";
// import { query } from "../../../../service/API";
export interface RegFormData {
  name?: string;
  email: string;
  password: string;
}

export function FormDialog({
  toggleModal,
  open,
}: {
  toggleModal: () => void;
  open: boolean;
}) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFieldChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const propName = target.getAttribute("id") as string;

    if (target.value.length > 0) {
      setCredentials({ ...credentials, [propName]: target.value });
    }
  };

  const [userFormLogin, setUserFormLogin] = useState(true);

  const switchForm = () => {
    setUserFormLogin((userFormLogin) => !userFormLogin);
    console.log("Bla Bla Bla");
  };

  // const [userName, setUserName] = useState("");
  // const [userMail, setUserMail] = useState("");
  // const [userPass, setUserPass] = useState("");
  //
  // const handleUserName = (e: ChangeEvent) => {
  //   const target = e.target as HTMLInputElement;
  //   setUserName(target.value);
  // };
  // const handleUserMail = (e: ChangeEvent) => {
  //   const target = e.target as HTMLInputElement;
  //   setUserName(target.value);
  // };
  // const handleUserPass = (e: ChangeEvent) => {
  //   const target = e.target as HTMLInputElement;
  //   setUserName(target.value);
  // };

  const insertNameField = () => {
    const { name } = credentials;
    return (
      <TextField
        autoFocus
        margin="dense"
        id="Name"
        label="Ваше Имя"
        type="text"
        fullWidth
        name="Name"
        value={name}
        onChange={(e: ChangeEvent) => handleFieldChange(e)}
      />
    );
  };

  const onSubmit = () => {};
  const { email, password } = credentials;
  return (
    <>
      <Dialog
        open={open}
        onClose={toggleModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Войти</DialogTitle>
        <form action="#" onSubmit={onSubmit}>
          <DialogContent>
            <DialogContentText>Введите Ваши данные</DialogContentText>
            {!userFormLogin ? insertNameField() : null}
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Адрес электронной почты"
              type="email"
              fullWidth
              name="email"
              onChange={(e: ChangeEvent) => handleFieldChange(e)}
              value={email}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Пароль"
              type="password"
              fullWidth
              name="password"
              onChange={(e: ChangeEvent) => handleFieldChange(e)}
              value={password}
            />
            <input
              type="checkbox"
              id="formSwitcher"
              onChange={() => switchForm()}
            />
            <label htmlFor="formSwitcher">
              Не можете войти? Зарегистрируйтейсь
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleModal} color="primary">
              Отмена
            </Button>
            <Button type="submit" color="primary">
              Войти
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}