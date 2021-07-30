import PersistedUserDeleter from "./interfaces/persisted-user-deleter";
import ID from "../domain/value-objects/id";

export default class UserDeleter {
  constructor(
    private readonly persistedUserDeleter: PersistedUserDeleter
  ) {
    if (!persistedUserDeleter)
      throw new Error('persistedUserDeleter must be defined');
  }

  public async deleteUser(id: ID): Promise<void> {
    await this.persistedUserDeleter
      .deletePersistedUser(id)
      .catch(error => {
        console.error(error);

        throw new Error(
          `Error deleting user with id ${ id.getValue() } from persistence`
        );
      })
  }
}