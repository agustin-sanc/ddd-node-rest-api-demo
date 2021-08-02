import User from "../../domain/entities/user";
import PersistedUserCreator from "../interfaces/persisted-user-creator";
import EmailAddress from "../../domain/value-objects/email-address";
import Password from "../../domain/value-objects/password";
import ID from "../../domain/value-objects/id";
import {UserTypes} from "../../domain/enums/user-types";
import ConflictError from "../../infrastructure/rest-api/middlewares/errors/conflict-error";
import UnprocessableEntityError from "../../infrastructure/rest-api/middlewares/errors/unprocessable-entity-error";
import UsersFinder from "./users-finder";

interface ConstructorParams {
  persistedUserCreator: PersistedUserCreator;
  usersFinder: UsersFinder;
}

export default class UserCreator {
  private readonly persistedUserCreator: PersistedUserCreator;
  private readonly usersFinder: UsersFinder;

  constructor(params: ConstructorParams) {
    this.checkForUndefinedConstructorParams(params);

    this.persistedUserCreator = params.persistedUserCreator;
    this.usersFinder = params.usersFinder;
  }

  public async createUser(params: {
    emailAddress: EmailAddress,
    password: Password,
    type: string
  }): Promise<User> {
    const foundUserWithSameEmailAddress =
      await this.usersFinder.findUserByEmailAddress(params.emailAddress);

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

  private checkForUndefinedConstructorParams(
    params: ConstructorParams
  ): void {
    if(!params.persistedUserCreator)
      throw new Error('persistedUserCreator must be defined');

    if(!params.usersFinder)
      throw new Error('usersFinder must be defined');
  }
}