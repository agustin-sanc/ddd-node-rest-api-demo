import PersistedUserCreator from "../../../application/interfaces/persisted-user-creator";
import User from "../../../domain/entities/user";

export default class MongoPersistedUserCreator
  implements PersistedUserCreator {
  public async createPersistedUser(user: User): Promise<void> {
    return Promise.resolve(undefined);
  }
}