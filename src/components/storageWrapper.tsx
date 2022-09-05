import { Locals } from '../common/enums/locals';
import { Storage } from '../common/templates/storage';
import { signInResponse } from '../common/interfaces/loginData';

class StorageWrapper extends Storage<Locals> {
  private static instance?: StorageWrapper;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new StorageWrapper();
    }

    return this.instance;
  }

  public getSavedUser() {
    return this.get(Locals.USER);
  }

  public setSavedUserId(savedItem: string) {
    this.set(Locals.USER, savedItem);
  }

  public setSavedUserName(savedItem: string) {
    this.set(Locals.USER_NAME, savedItem);
  }

  public getSavedUserName() {
    return this.get(Locals.USER_NAME);
  }

  public setSavedTokenExpires(savedItem: string) {
    this.set(Locals.EXPIRES_ON, savedItem);
  }

  public getSavedTokenExpires() {
    return this.get(Locals.EXPIRES_ON);
  }

  public clearSavedUser() {
    this.clearItems([Locals.USER]);
  }

  public getSavedRefreshToken() {
    return this.get(Locals.REFRESHTOKEN);
  }

  public setSavedRefreshToken(savedItem: string) {
    this.set(Locals.REFRESHTOKEN, savedItem);
  }

  public clearSavedRefreshToken() {
    this.clearItems([Locals.REFRESHTOKEN]);
  }

  public getSavedToken() {
    return this.get(Locals.TOKEN);
  }

  public setSavedToken(savedItem: string) {
    this.set(Locals.TOKEN, savedItem);
  }

  public clearSavedToken() {
    this.clearItems([Locals.TOKEN]);
  }

  public getSavedGroup() {
    return this.get(Locals.GROUP);
  }

  public setSavedGroup(savedItem: string) {
    this.set(Locals.GROUP, savedItem);
  }

  public clearSavedGroup() {
    this.clearItems([Locals.GROUP]);
  }

  public getSavedPage() {
    return this.get(Locals.PAGE);
  }

  public setSavedPage(savedItem: string) {
    this.set(Locals.PAGE, savedItem);
  }

  public clearSavedPage() {
    this.clearItems([Locals.PAGE]);
  }

  public clear() {
    this.clearItems([
      Locals.USER,
      Locals.USER_NAME,
      Locals.REFRESHTOKEN,
      Locals.TOKEN,
      Locals.GROUP,
      Locals.PAGE,
    ]);
  }

  public clearUserSettings() {
    this.clearItems([
      Locals.USER,
      Locals.USER_NAME,
      Locals.REFRESHTOKEN,
      Locals.TOKEN,
    ]);
  }

  public updateUserData(data: signInResponse) {
    if (data) {
      const { userId, token, refreshToken, name } = data;
      this.set(Locals.USER, userId);
      this.set(Locals.TOKEN, token);
      this.set(Locals.REFRESHTOKEN, refreshToken);
      this.set(Locals.USER_NAME, name);
      this.set(
        Locals.EXPIRES_ON,
        String(
          new Date(Date.now()).setMinutes(
            new Date(Date.now()).getMinutes() + 4 * 60,
          ),
        ),
      );
    }
  }
}

export default StorageWrapper;
