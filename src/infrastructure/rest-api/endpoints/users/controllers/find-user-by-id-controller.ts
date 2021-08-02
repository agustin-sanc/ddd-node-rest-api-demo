import { Request, Response } from "express";
import User from "../../../../../domain/entities/user";
import getRawUserObject from "../../../../../domain/mappers/get-raw-user-object";
import ID from "../../../../../domain/value-objects/id";
import buildUsersFinderApplicationService from "../../../../builders/build-users-finder-application-service";
import {UserTypes} from "../../../../../domain/enums/user-types";
import ForbiddenError from "../../../middlewares/errors/forbidden-error";

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
    const requestUser: User = request.user;
    console.log(requestUser);
    const requestParams = getValidatedRequestParams(request);
    let requestedUserId: ID;

    if (
      requestUser.hasType(UserTypes.ADMIN_USER)
      && requestParams.id
    ) {
      requestedUserId = requestParams.id;
    } else if (
      requestUser.hasType(UserTypes.END_USER)
      && requestParams.id
      && !(requestUser.hasId(requestParams.id))
    ) {
      next(new ForbiddenError());

      return;
    } else {
      requestedUserId = requestUser.getId();
    }

    const usersFinder = buildUsersFinderApplicationService();
    user = await usersFinder.findUserById(requestedUserId);
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

  if (request.query.id)
    id = new ID(request.query.id);

  return {
    id
  }
}