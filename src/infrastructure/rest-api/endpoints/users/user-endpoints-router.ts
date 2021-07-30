import * as Express from 'express';
import {Router} from 'express';
import handleCreateUserEndpointRequest from "./create-user/create-user-endpoint-handler";
import handleUpdateUserEndpointRequest from "./update-user/update-user-endpoint-handler";
import handleFindUsersEndpointRequest from "./find-users/find-users-endpoint-handler";
import handleFindUserByIdEndpointRequest from "./find-user-by-id/find-user-by-id-endpoint-handler";
import handleDeleteUserEndpointRequest from "./delete-user/delete-user-endpoint-handler";

export default function getUserEndpointsRouter(): Router {
  const router = Express.Router();

  router.post('/api/v1/user', handleCreateUserEndpointRequest);
  router.patch('/api/v1/user', handleUpdateUserEndpointRequest);
  router.get('/api/v1/users', handleFindUsersEndpointRequest);
  router.get('/api/v1/user', handleFindUserByIdEndpointRequest);
  router.delete('/api/v1/user', handleDeleteUserEndpointRequest);

  return router;
}