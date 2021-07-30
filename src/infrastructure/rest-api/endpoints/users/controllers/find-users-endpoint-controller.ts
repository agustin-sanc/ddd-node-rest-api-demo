import UsersFinder from "../../../../../application/users-finder";
import { Request, Response } from "express";
import User from "../../../../../domain/entities/user";
import getRawUserObject from "../../../../../domain/mappers/get-raw-user-object";

export default class FindUsersEndpointController {
  constructor(
    private readonly usersFinder: UsersFinder
  ) {
    if (!usersFinder)
      throw new Error('usersFinder must be defined');
  }

  public async execute(params: {
    request: Request,
    response: Response
  }) : Promise<Response> {
    const { response } = params;

    let users: User[];

    try {
      users = await this.usersFinder.findUsers()
    } catch(error) {
      console.error(error);

      return response
        .status(500)
        .send({
          error: 'Internal server error',
          description: error.message
        })
    }

    return response
      .status(200)
      .send({
        message: 'Users obtained successfully',
        users: users.map(user => {
          return getRawUserObject(user);
        })
      });
  }
}