import User from "../user";

export default interface PersistedUserCreator {
  createPersistedUser(user: User): Promise<void>;
}