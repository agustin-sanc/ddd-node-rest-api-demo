import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { Application } from 'express';
const morganBody = require('morgan-body');

export default function setupCommonMiddlewares(
  expressApplication: Application,
): void {
  expressApplication.use(express.json());
  setupSecurityMiddlewares(expressApplication);
  setupLoggerMiddleware(expressApplication);
}

function setupSecurityMiddlewares(expressApplication: Application): void {
  expressApplication.use(cors());
  expressApplication.use(helmet());
}

function setupLoggerMiddleware(expressApplication: Application): void {
  morganBody(expressApplication, {
    logReqHeaderList: ['authorization'],
    logResponseBody: true,
  });
}