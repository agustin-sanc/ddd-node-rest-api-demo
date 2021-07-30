import buildUsersFinderApplicationService from "../../../../builders/build-users-finder-application-service";
import FindUserByIdEndpointController from "./find-user-by-id-endpoint-controller";

export default async function handleFindUserByIdEndpointRequest (
  request: Request,
  response: Response
): Promise<Response> {
  const usersFinder = buildUsersFinderApplicationService();

  const controller = new FindUserByIdEndpointController(
    usersFinder
  );

  return await controller.execute({
    request,
    response
  })
}