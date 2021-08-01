import { Request } from "express";

export default function getRequestAccessToken(
  request: Request
): string {
  const requestAuthorizationHeader: string =
    request.headers['authorization'];

  const requestToken: string =
    requestAuthorizationHeader.split(' ')[1];

  return requestToken;
}