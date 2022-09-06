export interface LoginData {
  email: string;
  password: string;
}

export interface RegData extends LoginData {
  name: string;
}

export type signInResponse = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};