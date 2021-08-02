import PersistedUserUpdater from "../interfaces/persisted-user-updater";
import EmailAddress from "../../domain/value-objects/email-address";
import Password from "../../domain/value-objects/password";
import ID from "../../domain/value-objects/id";
import UsersFinder from "./users-finder";

interface ConstructorParams {
  persistedUserUpdater: PersistedUserUpdater;
  usersFinder: UsersFinder;
}

interface UpdateUserParams {
  id: ID;
  emailAddress: EmailAddress;
  password: Password;
}

export default class UserUpdater {
  private readonly persistedUserUpdater: PersistedUserUpdater;
  private readonly usersFinder: UsersFinder;

  constructor(params: ConstructorParams) {
    this.checkForUndefinedConstructorParams(params);

    this.persistedUserUpdater = params.persistedUserUpdater;
    this.usersFinder = params.usersFinder;
  }

  public async updateUser(
    params: UpdateUserParams
  ): Promise<void> {
    const {id, emailAddress, password} = params;

    await this.usersFinder
      .checkIfEmailAddressIsAvailableForUpdateUser({
        id,
        emailAddress,
      });

    const user = await this.usersFinder.findUserById(id);

    if (emailAddress)
      user.changeEmailAddressTo(emailAddress);

    if (password)
      user.changePasswordTo(password);

    await this.persistedUserUpdater
      .updatePersistedUser(user)
      .catch(error => {
        console.error(error);

        throw new Error(
          `Error updating user with id ${id.getValue()} into persistence.`
        );
      })
  }

  private checkForUndefinedConstructorParams(
    params: ConstructorParams
  ): void {
    if (!params.persistedUserUpdater)
      throw new Error('persistedUserUpdater must be defined.');

    if (!params.usersFinder)
      throw new Error('usersFinder must be defined.');
  }
}