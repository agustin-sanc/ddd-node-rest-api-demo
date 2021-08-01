import User from "../../domain/entities/user";
import PersistedUserCreator from "../interfaces/persisted-user-creator";
import EmailAddress from "../../domain/value-objects/email-address";
import Password from "../../domain/value-objects/password";
import ID from "../../domain/value-objects/id";
import PersistedUserFinderByEmailAddress from "../interfaces/persisted-user-finder-by-email-address";
import {UserTypes} from "../../domain/enums/user-types";
import ConflictError from "../../infrastructure/rest-api/middlewares/errors/conflict-error";
import UnprocessableEntityError from "../../infrastructure/rest-api/middlewares/errors/unprocessable-entity-error";

export default class UserCreator {
  private readonly persistedUserCreator: PersistedUserCreator;
  private readonly persistedUserFinderByEmailAddress: PersistedUserFinderByEmailAddress;

  constructor(params: {
    persistedUserCreator: PersistedUserCreator,
    persistedUserFinderByEmailAddress: PersistedUserFinderByEmailAddress
  }) {
    if(!params.persistedUserCreator)
      throw new Error('persistedUserCreator must be defined')

    if(!params.persistedUserFinderByEmailAddress)
      throw new Error('persistedUserFinderByEmailAddress must be defined')

    this.persistedUserCreator = params.persistedUserCreator;

    this.persistedUserFinderByEmailAddress =
      params.persistedUserFinderByEmailAddress;
  }

  public async createUser(params: {
    emailAddress: EmailAddress,
    password: Password,
    type: string
  }): Promise<User> {
    const foundUserWithSameEmailAddress =
      await this.persistedUserFinderByEmailAddress
        .findPersistedUserByEmailAddress(
          params.emailAddress
        );

    if (foundUserWithSameEmailAddress) {
      throw new ConflictError(
        `Email address is already taken.`
      );
    }

    if (params.type === UserTypes.ADMIN_USER) {
      throw new UnprocessableEntityError(
        `Admin user only can be created directly into database.`
      )
    }

    const createdUser = new User({
      id: ID.create(),
      emailAddress: params.emailAddress,
      password: params.password,
      type: params.type
    });

    await this.persistedUserCreator.createPersistedUser(createdUser)
      .catch(error => {
        console.error(error);

        throw new Error('Error saving created user in persistence');
      })

    return createdUser;
  }
}