import * as Express from 'express';
import {Request, Response} from 'express';
import {CREATE_USER_REST_API_ENDPOINT_URI, FIND_USERS_REST_API_ENDPOINT_URI} from "./endpoints-uris";
import UserCreateRequestController from "./controllers/user-create-request-controller";
import buildUserCreatorApplicationService
  from "../../../builders/users-application-services/build-user-creator-application-service";
import buildUsersFinderApplicationService
  from "../../../builders/users-application-services/build-users-finder-application-service";
import UsersFinderRequestController from "./controllers/users-finder-request-controller";

const router = Express.Router();

router.post(CREATE_USER_REST_API_ENDPOINT_URI,
  async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const userCreator = buildUserCreatorApplicationService();

    const controller = new UserCreateRequestController(
      userCreator
    );

    return await controller.execute({
      request,
      response
    });
  });

router.get(FIND_USERS_REST_API_ENDPOINT_URI,
  async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const usersFinder = buildUsersFinderApplicationService();

    const controller = new UsersFinderRequestController(
      usersFinder
    );

    return await controller.execute({
      request,
      response
    })
  });

module.exports = router