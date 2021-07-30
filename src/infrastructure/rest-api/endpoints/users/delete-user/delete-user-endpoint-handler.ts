import buildUserDeleterApplicationService from "../../../../builders/build-user-deleter-application-service";
import DeleteUserEndpointController from "./delete-user-endpoint-controller";
import {Request, Response} from 'express';

export default async function handleDeleteUserEndpointRequest(
  request: Request,
  response: Response
): Promise<Response> {
  const userDeleter = buildUserDeleterApplicationService();

  const controller = new DeleteUserEndpointController(
    userDeleter
  );

  return await controller.execute({
    request,
    response
  })
}