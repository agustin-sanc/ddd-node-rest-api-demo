import { Request, Response } from "express";
import EmailAddress from "../../../../../domain/value-objects/email-address";
import Password from "../../../../../domain/value-objects/password";
import UserUpdater from "../../../../../application/services/user-updater";
import ID from "../../../../../domain/value-objects/id";

export default class UpdateUserEndpointController {
  constructor(
    private readonly userUpdater: UserUpdater
  ) {
    if (!userUpdater) throw new Error('userUpdater must be defined');
  }

  public async execute(params: {
    request: Request,
    response: Response
  }): Promise<Response> {
    const { request, response } = params;

    try {
      this.validateRequestBody(request.body);
    } catch(error) {
      return response
        .status(400)
        .send({
          error: error.message
        });
    }

    try {
      await this.userUpdater.updateUser({
        id: new ID(request.body.id),
        emailAddress: new EmailAddress(request.body.emailAddress),
        password: new Password(request.body.password),
      })
    } catch(error) {
      console.error(error);

      if (error.message.includes('Conflict'))
        return response
          .status(409)
          .send({
            error: error.message
          })

      if (error.message.includes('Validation'))
        return response
          .status(422)
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
        message: 'User updated successfully'
      });
  }

  private validateRequestBody(requestBody: any): void {
    if (!requestBody)
      throw new Error('Request body must be defined');

    if (!requestBody.emailAddress)
      throw new Error('emailAddress must be defined');

    if (!requestBody.password)
      throw new Error('password must be defined');
  }
}