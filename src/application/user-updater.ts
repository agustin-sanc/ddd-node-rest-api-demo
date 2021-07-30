import PersistedUserUpdater from "./interfaces/persisted-user-updater";
import PersistedUserFinderByEmailAddress from "./interfaces/persisted-user-finder-by-email-address";
import EmailAddress from "../domain/value-objects/email-address";
import Password from "../domain/value-objects/password";
import PersistedUserFinderById from "./interfaces/persisted-user-finder-by-id";
import ID from "../domain/value-objects/id";
import User from "../domain/entities/user";

export default class UserUpdater {
  private readonly persistedUserUpdater: PersistedUserUpdater;
  private readonly persistedUserFinderById: PersistedUserFinderById;
  private readonly persistedUserFinderByEmailAddress: PersistedUserFinderByEmailAddress;

  constructor(params: {
    persistedUserUpdater: PersistedUserUpdater,
    persistedUserFinderById: PersistedUserFinderById,
    persistedUserFinderByEmailAddress: PersistedUserFinderByEmailAddress
  }) {
    this.checkForUndefinedConstructorParams(params);

    this.persistedUserUpdater =
      params.persistedUserUpdater;

    this.persistedUserFinderById =
      params.persistedUserFinderById;

    this.persistedUserFinderByEmailAddress =
      params.persistedUserFinderByEmailAddress;
  }

  public async updateUser(params: {
    id: ID,
    emailAddress: EmailAddress,
    password: Password,
  }): Promise<void> {
    this.checkForUndefinedUpdateUserParams(params);

    const {id, emailAddress, password} = params;

    const user = await this.persistedUserFinderById
      .findPersistedUserById(params.id)
      .then((foundUser: User) => {
        if (!foundUser) {
          throw new Error(
            `User with id ${id.getValue()} doesn't exist`
          );
        }

        return foundUser;
      })
      .catch(error => {
        console.error(error);

        throw new Error(
          `Error finding user with id ${id.getValue()} into persistence`
        )
      })

    const foundUserWithSameEmailAddress =
      await this.persistedUserFinderByEmailAddress
        .findPersistedUserByEmailAddress(
          emailAddress
        );

    if (foundUserWithSameEmailAddress) {
      throw new Error(
        `Conflict. Email address is already taken.`
      );
    }

    user.changeEmailAddressTo(emailAddress);
    user.changePasswordTo(password);

    await this.persistedUserUpdater
      .updatePersistedUser(user)
      .catch(error => {
        console.error(error);

        throw new Error(
          `Error updating user with id ${id.getValue()} into persistence`
        )
      })
  }

  private checkForUndefinedConstructorParams(params: {
    persistedUserUpdater: PersistedUserUpdater,
    persistedUserFinderById: PersistedUserFinderById,
    persistedUserFinderByEmailAddress: PersistedUserFinderByEmailAddress
  }): void {
    if (!params.persistedUserUpdater)
      throw new Error('persistedUserUpdater must be defined');

    if (!params.persistedUserFinderById)
      throw new Error(
        'persistedUserFinderByID must be defined'
      );

    if (!params.persistedUserFinderByEmailAddress)
      throw new Error(
        'persistedUserFinderByEmailAddress must be defined'
      );
  }

  private checkForUndefinedUpdateUserParams(params: {
    id: ID,
    emailAddress: EmailAddress,
    password: Password,
  }): void {
    if (!params.id)
      throw new Error('id must be defined');

    if (!params.emailAddress)
      throw new Error('emailAddress must be defined');

    if (!params.password)
      throw new Error('password must be defined');
  }
}