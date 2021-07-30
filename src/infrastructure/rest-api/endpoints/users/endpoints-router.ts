import * as Express from 'express';
import {Request, Response} from 'express';
import {CREATE_USER_REST_API_ENDPOINT_URI} from "./endpoints-uris";
import UserCreateRequestController from "./controllers/user-create-request-controller";
import buildUserCreatorApplicationService
  from "../../../builders/users-application-services/build-user-creator-application-service";

const router = Express.Router();

router.post(CREATE_USER_REST_API_ENDPOINT_URI,
  async (
    request: Request,
    response: Response
  ): Promise<Response> => {
  const userCreator = buildUserCreatorApplicationService();

  const controller = new UserCreateRequestController(userCreator);

  return await controller.execute({
    request,
    response
  });
});

module.exports = router