import UsersFinder from "../../../../../application/users-finder";
import { Request, Response } from "express";
import User from "../../../../../domain/entities/user";

export default class UsersFinderRequestController {
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
          error: 'Internal Server Error',
          description: error.message
        })
    }

    return response
      .status(200)
      .send({
        message: 'Users obtained successfully',
        users: users.map(user => {
          return {
            id: user.getId().getValue(),
            emailAddress: user.getEmailAddress().getValue(),
            password: user.getPassword().getValue(),
            type: user.getType()
          }
        })
      });
  }
}