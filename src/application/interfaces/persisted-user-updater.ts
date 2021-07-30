import User from "../../domain/entities/user";

export default interface PersistedUserUpdater {
  updatePersistedUser(user: User): Promise<void>;
}