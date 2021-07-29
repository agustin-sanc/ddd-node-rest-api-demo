import User from "../../domain/user";

export default interface PersistedUserCreator {
  createPersistedUser(user: User): Promise<void>;
}