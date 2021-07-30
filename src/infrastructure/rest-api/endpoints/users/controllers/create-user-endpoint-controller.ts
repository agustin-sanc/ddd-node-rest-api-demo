import { Request, Response } from "express";
import UserCreator from "../../../../../application/user-creator";
import EmailAddress from "../../../../../domain/value-objects/email-address";
import Password from "../../../../../domain/value-objects/password";

export default class CreateUserEndpointController {
  constructor(
    private readonly userCreator: UserCreator
  ) {
    if (!userCreator) throw new Error('userCreator must be defined');
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
      await this.userCreator.createUser({
        emailAddress: new EmailAddress(request.body.emailAddress),
        password: new Password(request.body.password),
        type: request.body.type
      })
    } catch(error) {
      console.error(error);

      if (error.message.includes('Conflict error'))
        return response
          .status(409)
          .send({
            error: error.message
          })

      if (error.message.includes('Validation error'))
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

    return response.status(201).send({
      message: 'User created successfully'
    });
  }

  private validateRequestBody(body: any): void {
    if (!body)
      throw new Error('Request body must be defined');

    if (!body.emailAddress)
      throw new Error('emailAddress must be defined');

    if (!body.password)
      throw new Error('password must be defined');

    if (!body.type)
      throw new Error('type must be defined');
  }
}