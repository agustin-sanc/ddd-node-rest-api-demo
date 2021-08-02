import { Request, Response } from "express";
import getRawUserObject from "../../../../../domain/mappers/get-raw-user-object";
import buildUsersFinderApplicationService from "../../../../builders/build-users-finder-application-service";
import User from "../../../../../domain/entities/user";

export default async function findUsersController(
  request: Request,
  response: Response,
  next: any
): Promise<void> {
  let users: User[] = [];

  try {
    const usersFinder = buildUsersFinderApplicationService();
    users = await usersFinder.findUsers();
  } catch (error) {
    next(error);
    return;
  }

  response
    .status(200)
    .send({
      message: 'Users obtained successfully',
      users: users.map(user => {
        return getRawUserObject(user);
      })
    });

  return;
}