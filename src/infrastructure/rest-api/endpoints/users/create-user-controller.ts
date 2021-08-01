import { Request, Response } from 'express';
import EmailAddress from "../../../../domain/value-objects/email-address";
import Password from "../../../../domain/value-objects/password";
import ClientError from "../../middlewares/errors/client-error";
import buildUserCreatorApplicationService from "../../../builders/build-user-creator-application-service";

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
    const requestBody = extractRequestBody(request);

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

function extractRequestBody(
  request: Request
): RequestBody {
  const requestRawBody = request.body;

  let requestBody: RequestBody = {
    emailAddress: undefined,
    password: undefined,
    type: undefined
  };

  try {
    requestBody.emailAddress = new EmailAddress(
      requestRawBody.emailAddress
    );

    requestBody.password = new Password(
      requestRawBody.password
    );

    if (requestRawBody.type)
      requestBody.type = requestRawBody.type;
    else
      throw new Error('User type must be defined.');
  } catch (error) {
    throw new ClientError(error.message);
  }

  return requestBody;
}
