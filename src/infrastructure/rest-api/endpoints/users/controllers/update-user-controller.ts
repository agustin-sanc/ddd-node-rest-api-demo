import { Request, Response } from "express";
import EmailAddress from "../../../../../domain/value-objects/email-address";
import Password from "../../../../../domain/value-objects/password";
import ID from "../../../../../domain/value-objects/id";
import buildUserUpdaterApplicationService from "../../../../builders/build-user-updater-application-service";
import ClientError from "../../../middlewares/errors/client-error";
import User from "../../../../../domain/entities/user";
import {UserTypes} from "../../../../../domain/enums/user-types";
import ForbiddenError from "../../../middlewares/errors/forbidden-error";

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
    const requestUser: User = request.user;
    let userToUpdateId: ID;

    if (!requestBody.id) {
      userToUpdateId = requestUser.getId();
    }

    if (
      requestUser.hasType(UserTypes.ADMIN_USER)
      && requestBody.id
    ) {
      userToUpdateId = requestBody.id;
    }

    if (
      requestUser.hasType(UserTypes.END_USER)
      && requestBody.id
      && !(requestUser.hasId(requestBody.id))
    ) {
      next(new ForbiddenError());

      return;
    }

    const userUpdater = buildUserUpdaterApplicationService();

    await userUpdater.updateUser({
      id: userToUpdateId,
      emailAddress: requestBody.emailAddress,
      password: requestBody.password
    });
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

  if (request.body.id) {
    try {
      id = new ID(request.body.id);
    } catch (error) {
      throw new ClientError(error.message);
    }
  }

  if (request.body.emailAddress) {
    try {
      emailAddress = new EmailAddress(
        request.body.emailAddress
      );
    } catch (error) {
      throw new ClientError(error.message);
    }
  }

  if (request.body.password) {
    try {
      password = new Password(
        request.body.password
      );
    } catch (error) {
      throw new ClientError(error.message);
    }
  }

  return {
    id,
    emailAddress,
    password
  }
}