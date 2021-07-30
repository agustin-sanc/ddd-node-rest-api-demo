import JwtService from "../../../../auth/jwt-service";
import {Request, Response} from 'express';
import UsersFinder from "../../../../../application/services/users-finder";
import EmailAddress from "../../../../../domain/value-objects/email-address";
import Password from "../../../../../domain/value-objects/password";

export default class CreateSessionEndpointController {
  private readonly jwtService: JwtService;
  private readonly usersFinder: UsersFinder;

  constructor(params: {
    jwtService: JwtService,
    usersFinder: UsersFinder
  }) {
    this.checkForUndefinedConstructorParams(params);

    this.jwtService = params.jwtService;
    this.usersFinder = params.usersFinder;
  }

  public async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      this.validateRequestBody(request.body);
    } catch(error) {
      console.error(error);

      return response
        .status(400)
        .send({
          error: error.message
        });
    }

    let accessToken: string;

    try {
      const user = await this.usersFinder
        .findUserByEmailAddressAndPassword({
          emailAddress: new EmailAddress(
            request.body.emailAddress
          ),
          password: new Password(
            request.body.password
          )
        });

      accessToken = this.jwtService
        .createToken(
          user.getId()
        );
    } catch(error) {
      console.error(error);

      if (error.message.includes('Invalid credentials'))
        return response
          .status(401)
          .send({
            error: error.message
          });

      return response
        .status(500)
        .send({
          error: 'Internal server error',
          description: error.message
        });
    }

    return response
      .status(201)
      .send({
        message: 'Session created successfully',
        accessToken
      });
  }

  private checkForUndefinedConstructorParams(
    params: {
      jwtService: JwtService,
      usersFinder: UsersFinder
    }
  ): void {
    if (!params.jwtService)
      throw new Error('jwtService must be defined');

    if (!params.usersFinder)
      throw new Error('usersFinder must be defined');
  }

  private validateRequestBody(requestBody: any): void {
    if (!requestBody.emailAddress)
      throw new Error(
        `emailAddress must be defined`
      );

    if (!requestBody.password)
      throw new Error(
        `password must be defined`
      );
  }
}