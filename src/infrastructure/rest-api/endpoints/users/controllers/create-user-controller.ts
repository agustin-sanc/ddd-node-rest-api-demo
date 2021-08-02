import { Request, Response } from 'express';
import buildUserCreatorApplicationService from "../../../../builders/build-user-creator-application-service";
import EmailAddress from "../../../../../domain/value-objects/email-address";
import Password from "../../../../../domain/value-objects/password";
import ClientError from "../../../middlewares/errors/client-error";

interface RequestBody {
  emailAddress: EmailAddress;
  password: Password;
  type: string;
}

export default async function createUserController(
  request: Request,
  response: Response,
  next: any
): Promise<void> {
  try {
    const requestBody: RequestBody = getValidatedRequestBody(request);

    const userCreator = buildUserCreatorApplicationService();
    await userCreator.createUser(requestBody);
  } catch(error) {
    next(error);

    return;
  }

  response
    .status(201)
    .send({
      message: 'User created successfully'
    });

  return;
}

function getValidatedRequestBody(
  request: Request
): RequestBody {
  let emailAddress: EmailAddress;
  let password: Password;
  let type: string;

  try {
    emailAddress = new EmailAddress(
      request.body.emailAddress
    );

    password = new Password(
      request.body.password
    );

    if (request.body.type)
      type = request.body.type;
    else
      throw new Error('User type must be defined.');
  } catch (error) {
    throw new ClientError(error.message);
  }

  return {
    emailAddress,
    password,
    type
  };
}