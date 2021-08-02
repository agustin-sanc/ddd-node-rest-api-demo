import * as Express from 'express';
import { Router } from 'express';
import authenticateUser from "../../middlewares/auth/authenticate-user";
import authorizeAdminUserOnly from "../../middlewares/auth/authorize-admin-user-only";
import createUserController from "./controllers/create-user-controller";
import findUsersController from "./controllers/find-users-controller";
import updateUserController from "./controllers/update-user-controller";
import deleteUserController from "./controllers/delete-user-controller";
import findUserByIdController from "./controllers/find-user-by-id-controller";

export default function setupUsersRouter(): Router {
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
    authenticateUser,
    updateUserController
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
    authenticateUser,
    authorizeAdminUserOnly,
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
    authenticateUser,
    findUserByIdController
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
    authenticateUser,
    authorizeAdminUserOnly,
    deleteUserController
  );

  return router;
}