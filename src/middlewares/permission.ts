import { type NextFunction, type Request, type Response } from "express";
import ForbiddenException from "../exceptions/http/ForbiddenException";
import UnauthorizedException from "../exceptions/http/UnauthorizedException";
import { AuthorizedUser } from "../types/authorization";

export default function requirePermission(clearance = 1) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authorizedUser: AuthorizedUser = res.locals.authorizedUser;
    if (!authorizedUser) {
      throw new UnauthorizedException("Unauthorized access");
    }

    if (req.params.userId === "me") {
      req.params.userId = authorizedUser.user_id;
    }

    if (authorizedUser.clearance < clearance) {
      throw new ForbiddenException("Authorization restricted");
    }

    const requestUser = req.params?.userId;
    if (!requestUser) {
      next();
      return;
    }

    const isCrossAccessRequest =
      req.params.userId !== String(authorizedUser.user_id);

    const isAdminRequest = authorizedUser.clearance > 3;

    if (isCrossAccessRequest && !isAdminRequest) {
      throw new ForbiddenException("Cross Access Restricted");
    }

    next();
  };
}
