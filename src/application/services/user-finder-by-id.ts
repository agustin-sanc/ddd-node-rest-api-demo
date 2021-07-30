import User from "../../domain/entities/user";
import ID from "../../domain/value-objects/id";
import PersistedUserFinderById from "../interfaces/persisted-user-finder-by-id";

export default class UserFinderById {
  constructor(
    private readonly persistedUserFinderById: PersistedUserFinderById
  ) {
    if (!persistedUserFinderById)
      throw new Error('persistedUserFinderById must be defined');
  }

  public async findUserById(id: ID): Promise<User> {
    return await this.persistedUserFinderById
      .findPersistedUserById(id)
      .then(( foundUser: User ) => {
        if (!foundUser) {
          throw new Error(
            `User with id ${ id.getValue() } doesn't exist`
          );
        }

        return foundUser;
      })
      .catch(error => {
        console.error(error);

        if (error.message.includes("doesn't exist"))
          throw error;

        throw new Error(
          `Error finding persisted user with id ${ id.getValue() }`
        );
      });
  }
}