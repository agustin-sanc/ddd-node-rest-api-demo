import ID from "../../../domain/value-objects/id";
import EmailAddress from "../../../domain/value-objects/email-address";
import Password from "../../../domain/value-objects/password";
import {UserTypes} from "../../../domain/enums/user-types";
import User from "../../../domain/entities/user";
import { UserMongoDocumentModel } from "../models/user-mongo-document-model";

export default async function createUserIntoMongoDB(
  user: User
): Promise<void> {
  const userDocument = new UserMongoDocumentModel({
    _id: user.getId().getValue(),
    emailAddress: user.getEmailAddress().getValue(),
    password: user.getPassword().getValue(),
    type: user.getType(),
  });

  await userDocument.save()
    .then(() => {
      console.log(`User of type ${user.getType()} created successfully in MongoDB.`);
    })
    .catch((error) => {
      console.error(error);
      throw new Error('Error saving user document in MongoDB.');
    });
}

export async function createAdminUserIntoMongoDB()
  : Promise<void> {
  const admin = new User({
    id: new ID('1'),
    emailAddress: new EmailAddress('admin@email.com'),
    password: new Password('1234'),
    type: UserTypes.ADMIN_USER
  })

  await createUserIntoMongoDB(admin);
}

