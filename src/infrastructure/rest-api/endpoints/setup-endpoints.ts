import {Application} from "express";
import getUserEndpointsRouter from "./users/user-endpoints-router";
import getSessionEndpointsRouter from "./sessions/session-endpoints-router";

const userEndpointsRouter = getUserEndpointsRouter();
const sessionEndpointsRouter = getSessionEndpointsRouter();

export default function setupEndpoints(
  expressApplication: Application
): void {
  expressApplication.use('/',
    userEndpointsRouter,
    sessionEndpointsRouter
  );
}