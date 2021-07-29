import * as Http from "http";
import createExpressApplication from "./create-express-application";
import { Application } from "express";

export default function createHttpServerWithRESTAPI(): Http.Server {
  const expressApplication = createExpressApplication();
  return createHttpServer(expressApplication);
}

function createHttpServer(expressApplication: Application): Http.Server {
  const port = process.env.REST_API_SERVER_PORT;
  const host = process.env.HOST;
  const prefix = process.env.REST_API_SERVER_PREFIX;

  return expressApplication.listen(port, () => {
    console.log(`REST API server running on ${host}:${port}${prefix}`)
  })
}