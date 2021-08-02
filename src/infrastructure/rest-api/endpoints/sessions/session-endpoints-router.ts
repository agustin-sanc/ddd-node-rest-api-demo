import * as Express from 'express';
import {Router} from 'express';
import createSessionController from "./controllers/create-session-controller";

export default function setupSessionsRouter(): Router {
  const router = Express.Router();

  /**
   *  POST /api/v1/session
   *
   *  AUTH REQUIRED?
   *  - No.
   */

  router.post(
    '/api/v1/session',
    createSessionController
  );

  return router;
}