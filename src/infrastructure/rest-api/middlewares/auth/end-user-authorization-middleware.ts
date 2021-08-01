import {UserTypes} from "../../../../domain/enums/user-types";
import User from "../../../../domain/entities/user";
import ForbiddenError from "../errors/forbidden-error";
import { Request, Response } from 'express';

export default function endUserAuthorizationMiddleware(
  request: Request,
  response: Response,
  next: any
): void {
  const user: User = request.user;

  const allowedUserTypes = [
    UserTypes.END_USER
  ];

  for (const allowedUserType of allowedUserTypes) {
    if (user.hasType(allowedUserType)) {
      next();
      return;
    }
  }

  next(new ForbiddenError());
}