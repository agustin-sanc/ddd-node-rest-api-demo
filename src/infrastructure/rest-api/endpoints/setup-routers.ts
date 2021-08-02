import {Application} from "express";
import setupUsersRouter from "./users/setup-users-router";
import setupSessionsRouter from "./sessions/session-endpoints-router";

const userEndpointsRouter = setupUsersRouter();
const sessionEndpointsRouter = setupSessionsRouter();

export default function setupRouters(
  expressApplication: Application
): void {
  expressApplication.use(
    userEndpointsRouter,
    sessionEndpointsRouter
  );
}