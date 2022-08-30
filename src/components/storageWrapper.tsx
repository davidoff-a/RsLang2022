import {Locals} from "../common/enums/locals";
import {Storage} from "../common/templates/storage";

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
    this.clearItems([Locals.USER, Locals.REFRESHTOKEN, Locals.TOKEN, Locals.USER_NAME]);
  }
}

export default StorageWrapper;