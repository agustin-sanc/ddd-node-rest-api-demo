import setupEnvironmentVariables from "./infrastructure/setup-environment-variables";
import createHttpServerWithRESTAPI from "./infrastructure/rest-api/create-http-server-with-rest-api";

setupEnvironmentVariables();
createHttpServerWithRESTAPI();