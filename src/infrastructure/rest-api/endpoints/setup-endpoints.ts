import {Application} from "express";
import getUsersRouter from "./users/get-users-router";
import getSessionsRouter from "./sessions/session-endpoints-router";

const userEndpointsRouter = getUsersRouter();
const sessionEndpointsRouter = getSessionsRouter();

export default function setupEndpoints(
  expressApplication: Application
): void {
  expressApplication.use(
    userEndpointsRouter,
    sessionEndpointsRouter
  );
}