import { Request, Response } from "express";
import User from "../../../../../domain/entities/user";
import getRawUserObject from "../../../../../domain/mappers/get-raw-user-object";
import ID from "../../../../../domain/value-objects/id";
import buildUsersFinderApplicationService from "../../../../builders/build-users-finder-application-service";
import ClientError from "../../../middlewares/errors/client-error";

interface RequestParams {
  id: ID;
}

export default async function findUserByIdController(
  request: Request,
  response: Response,
  next: any
): Promise<void> {
  let user: User;

  try {
    const requestParams = getValidatedRequestParams(request);

    const usersFinder = buildUsersFinderApplicationService();
    user = await usersFinder.findUserById(requestParams.id);
  } catch (error) {
    next(error);

    return;
  }

  response
    .status(200)
    .send({
      message: 'User obtained successfully.',
      user: getRawUserObject(user)
    });

  return;
}

function getValidatedRequestParams(
  request: Request
): RequestParams {
  let id: ID;

  try {
    id = new ID(request.query.id);
  } catch (error) {
    throw new ClientError(error.message);
  }

  return {
    id
  }
}