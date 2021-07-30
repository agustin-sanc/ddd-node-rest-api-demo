import User from "../../../domain/entities/user";
import { UserMongoDocumentModel } from "./user-mongo-document-model";
import PersistedUserUpdater from "../../../application/interfaces/persisted-user-updater";

export default class MongoPersistedUserUpdater
  implements PersistedUserUpdater {
  public async updatePersistedUser(user: User): Promise<void> {
    await UserMongoDocumentModel
      .updateOne(
        { _id: user.getId().getValue() },
        {
          emailAddress: user.getEmailAddress().getValue(),
          password: user.getPassword().getValue(),
        }
      ).catch(error => {
        console.error(error);

        throw new Error(
          `Error updating user with id ${ user.getId().getValue() } in MongoDB`
        );
      });
  }
}