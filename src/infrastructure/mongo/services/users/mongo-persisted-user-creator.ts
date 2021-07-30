import PersistedUserCreator from "../../../../application/interfaces/persisted-user-creator";
import User from "../../../../domain/entities/user";
import { UserMongoDocumentModel } from "../../models/user-mongo-document-model";

export default class MongoPersistedUserCreator
  implements PersistedUserCreator {
  public async createPersistedUser(user: User): Promise<void> {
    const userDocument = new UserMongoDocumentModel({
      _id: user.getId().getValue(),
      emailAddress: user.getEmailAddress().getValue(),
      password: user.getPassword().getValue(),
      type: user.getType().toUpperCase(),
    });

    await userDocument.save().catch((error) => {
      console.error(error);
      throw new Error('Error saving user document in MongoDB');
    });
  }
}