import User from "../domain/entities/user";
import PersistedUserCreator from "./interfaces/persisted-user-creator";
import EmailAddress from "../domain/value-objects/email-address";
import Password from "../domain/value-objects/password";
import ID from "../domain/value-objects/id";

export default class UserCreator {
  constructor(
    private readonly persistedUserCreator: PersistedUserCreator
  ) {
    if(!persistedUserCreator)
      throw new Error('persistedUserCreator must be defined')
  }

  public async createUser(params: {
    emailAddress: EmailAddress,
    password: Password,
    type: string
  }): Promise<User> {
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