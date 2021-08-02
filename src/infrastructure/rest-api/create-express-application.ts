import { Application } from 'express';
import * as express from 'express';
import setupCommonMiddlewares from './middlewares/setup-common-middlewares';
import setupRouters from './endpoints/setup-routers';
import errorHandlingMiddleware from "./middlewares/errors/error-handling-middleware";

export default function createExpressApplication(): Application {
  const expressApplication = express();

  setupCommonMiddlewares(expressApplication);
  setupRouters(expressApplication);

  expressApplication.use(errorHandlingMiddleware);

  return expressApplication;
}
