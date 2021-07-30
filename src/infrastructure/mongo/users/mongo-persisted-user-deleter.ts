import { UserMongoDocumentModel } from "../models/user-mongo-document-model";
import PersistedUserDeleter from "../../../application/interfaces/persisted-user-deleter";
import ID from "../../../domain/value-objects/id";

export default class MongoPersistedUserDeleter
  implements PersistedUserDeleter {
  public async deletePersistedUser(id: ID): Promise<void> {
    await UserMongoDocumentModel
      .deleteOne({
        _id: id.getValue()
      })
      .catch(error => {
        console.error(error);

        throw new Error(
          `Error deleting user with id ${ id.getValue() } from MongoDB`
        )
      })
  }
}