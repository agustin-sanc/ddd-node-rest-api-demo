import { Request, Response } from 'express';
import UnauthorizedError from "./unauthorized-error";
import ConflictError from "./conflict-error";
import {Error} from "mongoose";
import ClientError from "./client-error";
import UnprocessableEntityError from "./unprocessable-entity-error";
import NotFoundError from "./not-found-error";
import ForbiddenError from "./forbidden-error";
import InvalidCredentialsError from "./invalid-credentials-error";

export default function errorHandlingMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: any
): Response {
  console.error(error);

  if (response.headersSent)
    return next(error);

  if (error instanceof ClientError) {
    response
      .status(400)
      .send({
        error: error.message
      });

    return;
  }

  if (error instanceof UnauthorizedError) {
    response
      .status(401)
      .send({
        error: 'Unauthorized'
      });

    return;
  }

  if (error instanceof InvalidCredentialsError) {
    response
      .status(401)
      .send({
        error: error.message
      });

    return;
  }

  if (error instanceof ForbiddenError) {
    response
      .status(403)
      .send({
        error: 'Forbidden'
      });

    return;
  }

  if (error instanceof NotFoundError) {
    response
      .status(404)
      .send({
        error: error.message
      });

    return;
  }

  if (error instanceof ConflictError) {
    response
      .status(409)
      .send({
        error: error.message
      });

    return;
  }

  if (error instanceof UnprocessableEntityError) {
    response
      .status(422)
      .send({
        error: error.message
      });

    return;
  }

  response
    .status(500)
    .send({
      error: 'Internal server error',
      description: error.message
    });

  return;
}