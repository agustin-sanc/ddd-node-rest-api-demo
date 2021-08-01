import { Application } from 'express';
import * as express from 'express';
import setupCommonMiddlewares from './middlewares/setup-common-middlewares';
import setupEndpoints from './endpoints/setup-endpoints';
import errorHandlingMiddleware from "./middlewares/errors/error-handling-middleware";

export default function createExpressApplication(): Application {
  const expressApplication = express();

  setupCommonMiddlewares(expressApplication);
  setupEndpoints(expressApplication);

  expressApplication.use(errorHandlingMiddleware);

  return expressApplication;
}
