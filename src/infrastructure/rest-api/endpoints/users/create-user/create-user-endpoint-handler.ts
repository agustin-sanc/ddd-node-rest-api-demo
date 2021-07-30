import {Request, Response} from 'express';
import buildUserCreatorApplicationService from "../../../../builders/build-user-creator-application-service";
import CreateUserEndpointController from "./create-user-endpoint-controller";

export default async function handleCreateUserEndpointRequest(
  request: Request,
  response: Response
): Promise<Response> {
  const userCreator = buildUserCreatorApplicationService();

  const controller = new CreateUserEndpointController(
    userCreator
  );

  return await controller.execute({
    request,
    response
  });
};