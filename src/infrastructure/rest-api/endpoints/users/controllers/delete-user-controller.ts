import { Request, Response } from "express";
import ID from "../../../../../domain/value-objects/id";
import buildUserDeleterApplicationService from "../../../../builders/build-user-deleter-application-service";
import ClientError from "../../../middlewares/errors/client-error";

interface RequestBody {
  id: ID;
}

export default async function deleteUserController(
  request: Request,
  response: Response,
  next: any
): Promise<void> {
  try {
    const requestBody = getValidatedRequestBody(request);

    const userDeleter = buildUserDeleterApplicationService();
    await userDeleter.deleteUser(requestBody.id);
  } catch (error) {
    next(error);

    return;
  }

  response
    .status(200)
    .send({
      message: 'User deleted successfully.'
    });

  return;
}

function getValidatedRequestBody(
  request: Request
): RequestBody {
  let id: ID;

  try {
    id = new ID(request.body.id);
  } catch (error) {
    throw new ClientError(error.message);
  }

  return {
    id
  }
}
