import {Application} from "express";

const UserEndpointHandlers = require("./users/endpoints-router")

export default function setupEndpoints(
  expressApplication: Application
): void {
  expressApplication.use('/',
    UserEndpointHandlers
  )
}