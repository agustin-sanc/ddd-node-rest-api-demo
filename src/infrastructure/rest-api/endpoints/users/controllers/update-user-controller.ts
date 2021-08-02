import { Request, Response } from "express";
import EmailAddress from "../../../../../domain/value-objects/email-address";
import Password from "../../../../../domain/value-objects/password";
import ID from "../../../../../domain/value-objects/id";
import buildUserUpdaterApplicationService from "../../../../builders/build-user-updater-application-service";
import ClientError from "../../../middlewares/errors/client-error";

interface RequestBody {
  id: ID,
  emailAddress: EmailAddress,
  password: Password,
}

export default async function updateUserController(
  request: Request,
  response: Response,
  next: any
): Promise<void> {
  try {
    const requestBody: RequestBody = getValidatedRequestBody(request);

    const userUpdater = buildUserUpdaterApplicationService();

    await userUpdater.updateUser(requestBody);
  } catch (error) {
    next(error);

    return;
  }

  response
    .status(200)
    .send({
      message: 'User updated successfully.'
    });

  return;
}

function getValidatedRequestBody(
  request: Request
): RequestBody {
  let id: ID;
  let emailAddress: EmailAddress;
  let password: Password;

  try {
    id = new ID(
      request.body.id
    );

    emailAddress = new EmailAddress(
      request.body.emailAddress
    );

    password = new Password(
      request.body.password
    );
  } catch (error) {
    throw new ClientError(error.message);
  }

  return {
    id,
    emailAddress,
    password
  }
}