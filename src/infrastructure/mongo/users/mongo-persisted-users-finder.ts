import User from "../../../domain/entities/user";
import { UserMongoDocumentModel } from "./user-mongo-document-model";
import PersistedUsersFinder from "../../../application/interfaces/persisted-users-finder";
import ID from "../../../domain/value-objects/id";
import EmailAddress from "../../../domain/value-objects/email-address";
import Password from "../../../domain/value-objects/password";
import PersistedUserFinderById from "../../../application/interfaces/persisted-user-finder-by-id";

export default class MongoPersistedUsersFinder
  implements PersistedUsersFinder, PersistedUserFinderById {
  public async findPersistedUsers(): Promise<Array<User>> {
    const userMongoDocuments = await UserMongoDocumentModel
      .find()
      .catch(error => {
        console.error(error);

        throw new Error('Error finding persisted users in MongoDB');
      });

    return this.createDomainUsersFromMongoDocuments(
      userMongoDocuments
    );
  }

  public async findPersistedUserById(id: ID): Promise<User> {
    const userMongoDocument = await UserMongoDocumentModel
      .findById(id.getValue())
      .catch(error => {
        console.error(error);

        throw new Error(
          `Error finding user with id ${ id.getValue() } in MongoDB`
        )
      });

    if (!userMongoDocument)
      throw new Error(
        `User with id ${ id.getValue() } doesn't exist`
      );

    const domainUser =
      this.createDomainUserFromMongoDocument(
        userMongoDocument
      );

    return domainUser;
  }

  private createDomainUsersFromMongoDocuments(
    userMongoDocuments: any
  ): Promise<Array<User>> {
    return userMongoDocuments.map(( userMongoDocument ) => {
      const domainUser =
        this.createDomainUserFromMongoDocument(
          userMongoDocument
        );

      return domainUser;
    });
  }

  private createDomainUserFromMongoDocument(
    userMongoDocument: any
  ): User {
    return new User({
      id: new ID(userMongoDocument._id.toString()),
      emailAddress: new EmailAddress(userMongoDocument.emailAddress),
      password: new Password(userMongoDocument.password),
      type: userMongoDocument.type
    });
  }
}