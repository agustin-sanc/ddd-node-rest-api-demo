import {Request, Response} from "express";
import getRequestAccessToken from "../../utils/get-request-access-token";
import JwtService from "../../../services/jwt-service";
import ID from "../../../../domain/value-objects/id";
import buildUsersFinderApplicationService from "../../../builders/build-users-finder-application-service";
import UnauthorizedError from "../errors/unauthorized-error";

export default async function authenticationMiddleware(
  request: Request,
  response: Response,
  next: any,
): Promise<void> {
  try {
    const requestToken = getRequestAccessToken(request);

    const jwtService = new JwtService();

    const tokenPayload =
      jwtService.verifyTokenAndGetPayload(
        requestToken
      );

    const userId = new ID(tokenPayload.userId);

    const usersFinder = buildUsersFinderApplicationService();
    request.user = await usersFinder.findUserById(userId);
  } catch (error) {
    next(new UnauthorizedError());
    return;
  }

  next();
}