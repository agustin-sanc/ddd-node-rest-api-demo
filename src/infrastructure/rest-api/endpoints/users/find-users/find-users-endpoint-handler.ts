import buildUsersFinderApplicationService from "../../../../builders/build-users-finder-application-service";
import FindUsersEndpointController from "./find-users-endpoint-controller";
import {Request, Response} from 'express';

export default async function handleFindUsersEndpointRequest (
  request: Request,
  response: Response
): Promise<Response> {
  const usersFinder = buildUsersFinderApplicationService();

  const controller = new FindUsersEndpointController(
    usersFinder
  );

  return await controller.execute({
    request,
    response
  })
}