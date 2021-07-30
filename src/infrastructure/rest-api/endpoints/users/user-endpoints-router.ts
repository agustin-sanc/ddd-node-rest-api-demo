import * as Express from 'express';
import {Request, Response} from 'express';
import CreateUserEndpointController from "./controllers/create-user-endpoint-controller";
import buildUserCreatorApplicationService
  from "../../../builders/users-application-services/build-user-creator-application-service";
import buildUsersFinderApplicationService
  from "../../../builders/users-application-services/build-users-finder-application-service";
import FindUsersEndpointController from "./controllers/find-users-endpoint-controller";
import FindUserByIdEndpointController from "./controllers/find-user-by-id-endpoint-controller";
import DeleteUserByIdEndpointController from "./controllers/delete-user-by-id-endpoint-controller";
import buildUserDeleterApplicationService
  from "../../../builders/users-application-services/build-user-deleter-application-service";
import UpdateUserEndpointController from "./controllers/update-user-endpoint-controller";
import buildUserUpdaterApplicationService
  from "../../../builders/users-application-services/build-user-updater-application-service";

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

router.patch('/api/v1/user',
  async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const userUpdater = buildUserUpdaterApplicationService();

    const controller = new UpdateUserEndpointController(
      userUpdater
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
    const usersFinder = buildUsersFinderApplicationService();

    const controller = new FindUserByIdEndpointController(
      usersFinder
    );

    return await controller.execute({
      request,
      response
    })
  });

router.delete('/api/v1/user',
  async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const userDeleter = buildUserDeleterApplicationService();

    const controller = new DeleteUserByIdEndpointController(
      userDeleter
    );

    return await controller.execute({
      request,
      response
    })
  });

module.exports = router