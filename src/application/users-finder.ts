import User from "../domain/entities/user";
import PersistedUsersFinder from "./interfaces/persisted-users-finder";

export default class UsersFinder {
  constructor(
    private readonly persistedUsersFinder: PersistedUsersFinder
  ) {
    if (!persistedUsersFinder)
      throw new Error('persistedUsersFinder must be defined');
  }

  public async findUsers(): Promise<Array<User>> {
    return await this.persistedUsersFinder
      .findPersistedUsers()
      .catch(error => {
        console.error(error);
        throw new Error('Error finding persisted users');
      })
  }
}