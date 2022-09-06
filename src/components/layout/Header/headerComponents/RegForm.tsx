// import React, { ChangeEvent } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { query } from '../../../../service/API';
import { LoginData, RegData, signInResponse } from '../../../../common/interfaces/loginData';
import storageWrapper from '../../../storageWrapper';
import { getAvatar } from '../Header';

export function FormDialog({
  toggleModal,
  open,
  handleUserAva,
}: {
  toggleModal: () => void;
  open: boolean;
  handleUserAva: (userAva: string) => void;
}) {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  } as RegData);

  const handleFieldChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const propName = target.getAttribute('id') as keyof typeof credentials;
    setCredentials(credentials => {
      if (credentials[propName].length !== target.value.length) {
        return { ...credentials, [propName]: target.value };
      }
      return credentials;
    });
  };

  const [userFormLogin, setUserFormLogin] = useState(true);

  const switchForm = () => {
    setUserFormLogin(userFormLogin => !userFormLogin);
  };

  const clearForm = () => {
    setCredentials({
      name: '',
      email: '',
      password: '',
    });
    setUserFormLogin(true);
  };

  const insertNameField = () => {
    const { name } = credentials;
    return (
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Ваше Имя"
        type="text"
        fullWidth
        name="name"
        value={name}
        onChange={(e: ChangeEvent) => handleFieldChange(e)}
      />
    );
  };

  const registerUser = async (data: RegData) => {
    try {
      await query.createUser(data);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  };
  const logIn = async (data: LoginData) => {
    try {
      const signIn = await query.signIn(data);
      const resp = (await signIn.json()) as signInResponse;
      const store = storageWrapper.getInstance();
      store.updateUserData(resp);

      handleUserAva(getAvatar(resp.name));
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    (async function () {
      const { email, password } = credentials;
      const loginBody = { email: email, password: password };
      if (!userFormLogin) {
        await registerUser(credentials);
      } else {
        await logIn(loginBody).catch(e => {
          if (!(e instanceof Error)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            throw new Error(e.message);
          }
        });
      }
    })().catch(e => {
      if (!(e instanceof Error)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
        throw new Error(e.message);
      }
    });
    clearForm();
    toggleModal();
  };

  const { email, password } = credentials;
  return (
    <>
      <Dialog open={open} onClose={toggleModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{userFormLogin ? 'Вход' : 'Регистрация'}</DialogTitle>
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
            <input type="checkbox" id="formSwitcher" onChange={() => switchForm()} />
            <label htmlFor="formSwitcher">Нет логина? Зарегистрируйтейсь</label>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleModal} color="primary">
              Отмена
            </Button>
            <Button type="submit" color="primary">
              {userFormLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
