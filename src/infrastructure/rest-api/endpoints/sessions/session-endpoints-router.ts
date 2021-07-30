import * as Express from 'express';
import {Router} from 'express';
import handleCreateSessionEndpointRequest from "./create-session/create-session-endpoint-handler";

export default function getSessionEndpointsRouter(): Router {
  const router = Express.Router();

  router.post('/api/v1/session', handleCreateSessionEndpointRequest);

  return router;
}