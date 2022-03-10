import { NextFunction, Request, Response } from "express";
import { AuthorizedUser } from "../types/authorization";
import ForbiddenException from "../exceptions/http/ForbiddenException";
import UnauthorizedException from "../exceptions/http/UnauthorizedException";

export default function requirePermission(clearance = 1) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authorizedUser: AuthorizedUser = res.locals.authorizedUser;
    if (!authorizedUser) {
      throw new UnauthorizedException("Unauthorized access");
    }

    // logger.info(JSON.stringify(authorizedUser));

    if (authorizedUser.clearance < clearance) {
      throw new ForbiddenException("Authorization restricted");
    }

    const requestUser = req.params?.userId;
    if (!requestUser) {
      return next();
    }

    if (requestUser === "me") {
      req.params.userId = String(authorizedUser.id);
    }

    const isCrossAccessRequest =
      req.params.userId !== String(authorizedUser.id);
    const isAdminRequest = authorizedUser.clearance > 3;

    if (isCrossAccessRequest && !isAdminRequest) {
      throw new ForbiddenException("Cross Access Restricted");
    }

    next();
  };
}
