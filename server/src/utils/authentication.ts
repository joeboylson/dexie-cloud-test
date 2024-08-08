import { Request, Response, NextFunction } from "express";

export function authorizationMiddleware(
  _: Request,
  response: Response,
  next: NextFunction
) {
  /**
   * TODO: ensure user is authenticated
   */
  const _isAuthenticated = true;

  if (_isAuthenticated) return next();
  return response.status(404).send();
}
