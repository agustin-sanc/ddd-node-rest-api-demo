import { Request, Response } from 'express';
import EmailAddress from "../../../../../domain/value-objects/email-address";
import Password from "../../../../../domain/value-objects/password";
import ClientError from "../../../middlewares/errors/client-error";
import JwtService from "../../../../services/jwt-service";
import buildUsersFinderApplicationService from "../../../../builders/build-users-finder-application-service";

interface RequestBody {
  emailAddress: EmailAddress;
  password: Password;
}

export default async function createSessionController(
  request: Request,
  response: Response,
  next: any
): Promise<void> {
  let token: string;

  try {
    const requestBody: RequestBody = getValidatedRequestBody(request);

    const usersFinder = buildUsersFinderApplicationService();

    const user = await usersFinder
      .findUserByEmailAddressAndPassword(requestBody);

    const jwtService = new JwtService();

    token = jwtService.createToken(user.getId());
  } catch (error) {
    next(error);

    return;
  }

  response
    .status(201)
    .send({
      message: 'Session created successfully.',
      token
    })

  return;
}

function getValidatedRequestBody(
  request: Request
): RequestBody {
  let emailAddress: EmailAddress;
  let password: Password;

  try {
    emailAddress = new EmailAddress(
      request.body.emailAddress
    );

    password = new Password(
      request.body.password
    );
  } catch (error) {
    throw new ClientError(error.message);
  }

  return {
    emailAddress,
    password
  }
}