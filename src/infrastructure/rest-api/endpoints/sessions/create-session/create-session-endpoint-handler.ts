import {Request, Response} from 'express';
import CreateSessionEndpointController from "./create-session-endpoint-controller";
import JwtService from "../../../../services/jwt-service";
import buildUsersFinderApplicationService from "../../../../builders/build-users-finder-application-service";

export default async function handleCreateSessionEndpointRequest(
  request: Request,
  response: Response
): Promise<void> {
  const jwtService = new JwtService();
  const usersFinder = buildUsersFinderApplicationService();

  const controller = new CreateSessionEndpointController({
    jwtService,
    usersFinder
  });

  await controller.execute(request, response);
}