import { Request, Response } from "express";
import User from "../../../../../domain/entities/user";
import getRawUserObject from "../../../../../domain/mappers/get-raw-user-object";
import ID from "../../../../../domain/value-objects/id";
import UsersFinder from "../../../../../application/services/users-finder";

export default class FindUserByIdEndpointController {
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
    const { request, response } = params;

    try {
      this.validateRequestParams(request.query);
    } catch(error) {
      console.error(error);

      return response
        .status(400)
        .send({
          error: error.message
        })
    }

    let user: User;

    try {
      user = await this.usersFinder.findUserById(
        new ID(request.query.id)
      );
    } catch(error) {
      console.error(error);

      if (error.message.includes('Not found'))
        return response
          .status(404)
          .send({
            error: error.message
          })

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
        message: 'User obtained successfully',
        user: getRawUserObject(user)
      })
  }

  private validateRequestParams(requestParams: any): void {
    if (!requestParams.id)
      throw new Error('id parameter must be defined');
  }
}