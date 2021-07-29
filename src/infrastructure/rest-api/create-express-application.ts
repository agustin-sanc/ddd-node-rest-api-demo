import { Application } from 'express';
import * as express from 'express';
import setupCommonMiddlewares from './middlewares/setup-common-middlewares';
import setupEndpoints from './endpoints/setup-endpoints';

export default function createExpressApplication(): Application {
  const expressApplication = express();

  setupCommonMiddlewares(expressApplication);
  setupEndpoints(expressApplication);

  return expressApplication;
}
