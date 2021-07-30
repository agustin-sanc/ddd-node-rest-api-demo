import buildUserUpdaterApplicationService from "../../../../builders/build-user-updater-application-service";
import UpdateUserEndpointController from "./update-user-endpoint-controller";
import {Request, Response} from 'express';

export default async function handleUpdateUserEndpointRequest(
  request: Request,
  response: Response
): Promise<Response> {
  const userUpdater = buildUserUpdaterApplicationService();

  const controller = new UpdateUserEndpointController(
    userUpdater
  );

  return await controller.execute({
    request,
    response
  });
}