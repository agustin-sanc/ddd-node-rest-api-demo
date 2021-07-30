import * as Express from 'express';
import {Request, Response} from 'express';
import CreateUserEndpointController from "./controllers/create-user-endpoint-controller";
import buildUserCreatorApplicationService
  from "../../../builders/users-application-services/build-user-creator-application-service";
import buildUsersFinderApplicationService
  from "../../../builders/users-application-services/build-users-finder-application-service";
import FindUsersEndpointController from "./controllers/find-users-endpoint-controller";
import findUserByIdEndpointController from "./controllers/find-user-by-id-endpoint-controller";
import buildUserFinderByIdApplicationService
  from "../../../builders/users-application-services/build-user-finder-by-id-application-service";

const router = Express.Router();

router.post('/api/v1/user',
  async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const userCreator = buildUserCreatorApplicationService();

    const controller = new CreateUserEndpointController(
      userCreator
    );

    return await controller.execute({
      request,
      response
    });
  });

router.get('/api/v1/users',
  async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const usersFinder = buildUsersFinderApplicationService();

    const controller = new FindUsersEndpointController(
      usersFinder
    );

    return await controller.execute({
      request,
      response
    })
  });

router.get('/api/v1/user',
  async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const userFinderById = buildUserFinderByIdApplicationService();

    const controller = new findUserByIdEndpointController(
      userFinderById
    );

    return await controller.execute({
      request,
      response
    })
  });

module.exports = router