import User from "../../domain/entities/user";

export default interface PersistedUserCreator {
  createPersistedUser(user: User): Promise<void>;
}