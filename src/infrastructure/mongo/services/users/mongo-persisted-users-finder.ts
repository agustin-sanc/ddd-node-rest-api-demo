import User from "../../../../domain/entities/user";
import { UserMongoDocumentModel } from "../../models/user-mongo-document-model";
import PersistedUsersFinder from "../../../../application/interfaces/persisted-users-finder";
import ID from "../../../../domain/value-objects/id";
import EmailAddress from "../../../../domain/value-objects/email-address";
import Password from "../../../../domain/value-objects/password";
import PersistedUserFinderById from "../../../../application/interfaces/persisted-user-finder-by-id";
import PersistedUserFinderByEmailAddress from "../../../../application/interfaces/persisted-user-finder-by-email-address";

export default class MongoPersistedUsersFinder
  implements PersistedUsersFinder, PersistedUserFinderById,
    PersistedUserFinderByEmailAddress
{
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
    const foundUserDocument = await UserMongoDocumentModel
      .findById(
        id.getValue()
      )
      .catch(error => {
        console.error(error);

        throw new Error(
          `Error finding user with id ${ id.getValue() } in MongoDB`
        )
      });

    let domainUserToReturn: User;

    if (foundUserDocument) {
      domainUserToReturn = this.createDomainUserFromMongoDocument(
        foundUserDocument
      );
    }

    return domainUserToReturn;
  }

  public async findPersistedUserByEmailAddress(emailAddress: EmailAddress): Promise<User> {
    const foundUserDocument = await UserMongoDocumentModel
      .findOne({
        emailAddress: emailAddress.getValue()
      })
      .catch(error => {
        console.error(error);

        throw new Error(
          `Error finding user with email address ${ emailAddress.getValue() } in MongoDB`
        );
      })

    let domainUserToReturn: User;

    if (foundUserDocument) {
      domainUserToReturn = this.createDomainUserFromMongoDocument(
        foundUserDocument
      );
    }

    return domainUserToReturn;
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