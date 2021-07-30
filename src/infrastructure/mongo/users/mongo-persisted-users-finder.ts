import User from "../../../domain/entities/user";
import { UserMongoDocumentModel } from "./user-mongo-document-model";
import PersistedUsersFinder from "../../../application/interfaces/persisted-users-finder";
import ID from "../../../domain/value-objects/id";
import EmailAddress from "../../../domain/value-objects/email-address";
import Password from "../../../domain/value-objects/password";

export default class MongoPersistedUsersFinder
  implements PersistedUsersFinder {

  public async findPersistedUsers(): Promise<Array<User>> {
    const userMongoDocuments = await UserMongoDocumentModel
      .find()
      .catch(error => {
        console.error(error);

        throw new Error('Error finding persisted users in MongoDB');
      })

    return this.createDomainUsersArray(
      userMongoDocuments
    );
  }

  private createDomainUsersArray(userMongoDocuments: any): Promise<Array<User>> {
    return userMongoDocuments.map(( userMongoDocument ) => {
      return new User({
        id: new ID(userMongoDocument._id.toString()),
        emailAddress: new EmailAddress(userMongoDocument.emailAddress),
        password: new Password(userMongoDocument.password),
        type: userMongoDocument.type
      })
    })
  }
}