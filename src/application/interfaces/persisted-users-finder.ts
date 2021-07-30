import User from "../../domain/entities/user";

export default interface PersistedUsersFinder {
  findPersistedUsers(): Promise<Array<User>>;
}