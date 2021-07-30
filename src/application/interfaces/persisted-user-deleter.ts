import ID from "../../domain/value-objects/id";

export default interface PersistedUserDeleter {
  deletePersistedUser(id: ID): Promise<void>;
}