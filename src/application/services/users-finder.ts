import User from "../../domain/entities/user";
import ID from "../../domain/value-objects/id";
import PersistedUserFinderById from "../interfaces/persisted-user-finder-by-id";
import PersistedUserFinderByEmailAddress from "../interfaces/persisted-user-finder-by-email-address";
import PersistedUsersFinder from "../interfaces/persisted-users-finder";
import EmailAddress from "../../domain/value-objects/email-address";
import Password from "../../domain/value-objects/password";
import NotFoundError from "../../infrastructure/rest-api/middlewares/errors/not-found-error";
import ConflictError from "../../infrastructure/rest-api/middlewares/errors/conflict-error";
import InvalidCredentialsError from "../../infrastructure/rest-api/middlewares/errors/invalid-credentials-error";

interface ConstructorParams {
  persistedUsersFinder: PersistedUsersFinder;
  persistedUserFinderById: PersistedUserFinderById;
  persistedUserFinderByEmailAddress: PersistedUserFinderByEmailAddress;
}

export default class UsersFinder {
  private readonly persistedUsersFinder: PersistedUsersFinder;
  private readonly persistedUserFinderById: PersistedUserFinderById;
  private readonly persistedUserFinderByEmailAddress: PersistedUserFinderByEmailAddress;

  constructor(params: ConstructorParams) {
    this.checkForUndefinedConstructorParams(params);

    this.persistedUsersFinder = params.persistedUsersFinder;
    this.persistedUserFinderById = params.persistedUserFinderById;
    this.persistedUserFinderByEmailAddress = params.persistedUserFinderByEmailAddress;
  }

  public async findUsers(): Promise<Array<User>> {
    return await this.persistedUsersFinder
      .findPersistedUsers()
      .catch(error => {
        console.error(error);
        throw new Error('Error finding persisted users');
      });
  }

  public async findUserByEmailAddress(
    emailAddress: EmailAddress
  ): Promise<User> {
    return await this.persistedUserFinderByEmailAddress
      .findPersistedUserByEmailAddress(emailAddress)
      .then(( foundUser: User ) => {
        if (!foundUser) {
          throw new NotFoundError(
            `User with email address ${ emailAddress.getValue() } doesn't exist.`
          );
        }

        return foundUser;
      })
      .catch(error => {
        console.error(error);

        if (error instanceof NotFoundError)
          throw error;

        throw new Error(
          `Error finding persisted user with email address ${ emailAddress.getValue() }.`
        );
      });
  }

  public async checkIfEmailAddressIsAvailableForNewUser(
    emailAddress: EmailAddress
  ): Promise<void> {
    const user = await this.findUserByEmailAddress(emailAddress)
      .catch(error => {
        if (!(error instanceof NotFoundError))
          throw error;
      });

    if (user)
      throw new ConflictError('Email address is already taken.');
  }

  public async checkIfEmailAddressIsAvailableForUpdateUser(params: {
    id: ID,
    emailAddress: EmailAddress
  }): Promise<void> {
    const user = await this.findUserByEmailAddress(params.emailAddress)
      .catch(error => {
        if (!(error instanceof NotFoundError))
          throw error;
      });

    if (user && !(user.hasId(params.id)))
      throw new ConflictError('Email address is already taken.');
  }

  public async findUserByEmailAddressAndPassword(
    params: {
      emailAddress: EmailAddress,
      password: Password
    }
  ): Promise<User> {
    const user = await this.findUserByEmailAddress(
        params.emailAddress
      ).catch(error => {
        console.error(error);

        if (error instanceof NotFoundError)
          throw new InvalidCredentialsError();

        throw error;
      })

    if(!user.hasPassword(params.password))
      throw new InvalidCredentialsError();

    return user;
  }

  public async findUserById(id: ID): Promise<User> {
    return await this.persistedUserFinderById
      .findPersistedUserById(id)
      .then(( foundUser: User ) => {
        if (!foundUser) {
          throw new NotFoundError(
            `User with id ${ id.getValue() } doesn't exist.`
          );
        }

        return foundUser;
      })
      .catch(error => {
        console.error(error);

        if (error instanceof NotFoundError)
          throw error;

        throw new Error(
          `Error finding persisted user with id ${ id.getValue() }.`
        );
      });
  }

  private checkForUndefinedConstructorParams(
    params: ConstructorParams
  ): void {
    if (!params.persistedUserFinderById)
      throw new Error('persistedUserFinderById must be defined.');

    if (!params.persistedUsersFinder)
      throw new Error('persistedUsersFinder must be defined.');

    if (!params.persistedUserFinderByEmailAddress)
      throw new Error('persistedUserFinderByEmailAddress must be defined.');
  }
}
