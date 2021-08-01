import * as Express from 'express';
import { Router } from 'express';
import handleUpdateUserEndpointRequest from "./update-user/update-user-endpoint-handler";
import handleFindUserByIdEndpointRequest from "./find-user-by-id/find-user-by-id-endpoint-handler";
import handleDeleteUserEndpointRequest from "./delete-user/delete-user-endpoint-handler";
import authenticationMiddleware from "../../middlewares/auth/authentication-middleware";
import adminAuthorizationMiddleware from "../../middlewares/auth/admin-authorization-middleware";
import createUserController from "./create-user-controller";
import findUsersController from "./find-users-controller";

export default function getUsersRouter(): Router {
  const router = Express.Router();

  /**
   *  POST /api/v1/user
   *
   *  AUTH REQUIRED?
   *  - No.
   *
   *  COMMENTS
   *  - This endpoint only allows to create end users.
   *  - Admins users must be created directly into database.
   */

  router.post(
    '/api/v1/user',
    createUserController
  );

  /**
   *  PATCH /api/v1/user
   *
   *  AUTH REQUIRED?
   *  - Yes.
   *
   *  ALLOWED USERS
   *  - Admin and end users.
   *
   *  PERMISSIONS
   *  - Admin user can edit anyone's data.
   *  - End user can edit his data only.
   */

  router.patch(
    '/api/v1/user',
    authenticationMiddleware,
    handleUpdateUserEndpointRequest
  );

  /**
   *  GET /api/v1/users
   *
   *  AUTH REQUIRED?
   *  - Yes.
   *
   *  ALLOWED USERS
   *  - Admin users.
   */

  router.get(
    '/api/v1/users',
    authenticationMiddleware,
    adminAuthorizationMiddleware,
    findUsersController
  );

  /**
   *  GET /api/v1/user
   *
   *  AUTH REQUIRED?
   *  - Yes.
   *
   *  ALLOWED USERS
   *  - Admins and end users.
   *
   *  PERMISSIONS
   *  - Admin user can access to anyone's data.
   *  - End user can access only to his data.
   */

  router.get(
    '/api/v1/user',
    authenticationMiddleware,
    handleFindUserByIdEndpointRequest
  );

  /**
   *  DELETE /api/v1/user
   *
   *  AUTH REQUIRED?
   *  - Yes.
   *
   *  ALLOWED USERS
   *  - Admin users.
   */

  router.delete(
    '/api/v1/user',
    authenticationMiddleware,
    adminAuthorizationMiddleware,
    handleDeleteUserEndpointRequest
  );

  return router;
}