import ID from "../../domain/value-objects/id";
import User from "../../domain/entities/user";

export default interface PersistedUserFinderById {
  findPersistedUserById(id: ID): Promise<User>;
}