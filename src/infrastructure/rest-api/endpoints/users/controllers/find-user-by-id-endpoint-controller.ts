import { Request, Response } from "express";
import User from "../../../../../domain/entities/user";
import UserFinderById from "../../../../../application/user-finder-by-id";
import getRawUserObject from "../../../../../domain/mappers/get-raw-user-object";
import ID from "../../../../../domain/value-objects/id";

export default class FindUserByIdEndpointController {
  constructor(
    private readonly userFinderById: UserFinderById
  ) {
    if (!userFinderById)
      throw new Error('userFinderById must be defined');
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
      user = await this.userFinderById.findUserById(
        new ID(request.query.id)
      );
    } catch(error) {
      console.error(error);

      if (error.message.includes("doesn't exist"))
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