import { Request, Response } from "express";
import ID from "../../../../../domain/value-objects/id";
import UserDeleter from "../../../../../application/services/user-deleter";

export default class DeleteUserEndpointController {
  constructor(
    private readonly userDeleter: UserDeleter
  ) {
    if (!userDeleter)
      throw new Error('userDeleter must be defined');
  }

  public async execute(params: {
    request: Request,
    response: Response
  }) : Promise<Response> {
    const { request, response } = params;

    try {
      this.validateRequestBody(request.body);
    } catch(error) {
      console.error(error);

      return response
        .status(400)
        .send({
          error: error.message
        })
    }

    try {
      await this.userDeleter.deleteUser(
        new ID(request.body.id)
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
        message: `User with id ${ request.body.id } deleted successfully`,
      })
  }

  private validateRequestBody(requestBody: any): void {
    if (!requestBody.id)
      throw new Error('id value must be defined');
  }
}