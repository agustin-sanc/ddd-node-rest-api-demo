import PersistedUserDeleter from "../interfaces/persisted-user-deleter";
import ID from "../../domain/value-objects/id";
import UsersFinder from "./users-finder";

export default class UserDeleter {
  private readonly persistedUserDeleter: PersistedUserDeleter;
  private readonly usersFinder: UsersFinder;

  constructor(params: {
    persistedUserDeleter: PersistedUserDeleter,
    usersFinder: UsersFinder;
  }) {
    this.checkForUndefinedConstructorParams(params);

    this.persistedUserDeleter = params.persistedUserDeleter;
    this.usersFinder = params.usersFinder;
  }

  public async deleteUser(id: ID): Promise<void> {
    await this.usersFinder.findUserById(id)

    await this.persistedUserDeleter
      .deletePersistedUser(id)
      .catch(error => {
        console.error(error);

        throw new Error(
          `Error deleting user with id ${ id.getValue() } from persistence`
        );
      })
  }

  private checkForUndefinedConstructorParams(params: {
    persistedUserDeleter: PersistedUserDeleter,
    usersFinder: UsersFinder;
  }): void {
    if (!params.persistedUserDeleter)
      throw new Error('persistedUserDeleter must be defined');

    if (!params.usersFinder)
      throw new Error('usersFinder must be defined');
  }
}