import { NextFunction, Request, Response } from "express";
import * as jsBase64 from "js-base64";
import * as jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import config from "../config";
import { sendResponse } from "../shared/utils/responseManager";
import InternalServerException from "../shared/exceptions/http/InternalServerException";
import ForbiddenException from "../shared/exceptions/http/ForbiddenException";

export interface TokenPayload {
  userId: string | number;
  clearance: number;
}

const publicKey = config.jwt.key ?? "";

export class JwtHelper {
  private readonly jwtKey: string;

  public constructor(jwtKey: string = publicKey) {
    this.jwtKey = jwtKey;
  }

  public generateToken(payload: any, expiry = "1d") : string{
    const encryptionKey = jsBase64.Base64.decode(this.jwtKey);

    const options = {
      expiresIn: expiry,
    };

    try {
      return jwt.sign(payload, encryptionKey, options);
    } catch (error) {
      throw new InternalServerException("Unable to complete", error);
    }
  }

  public verifyToken(token: string): TokenPayload {
    try {
      const payload = jwt.verify(token, jsBase64.Base64.decode(publicKey));
      return payload as TokenPayload;
    } catch (error) {
      throw new ForbiddenException("Unable to complete", error);
    }
  }

  public generateUserToken(userId: string | number, clearance: number) {
    const options: TokenPayload = { userId, clearance };
    return this.generateToken(options);
  }

  public requirePermission(
    clearance?: number
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers["x-auth-token"] as string;
      if (!token) {
        return sendResponse(res, {
          code: StatusCodes.FORBIDDEN,
          message: "Security Requirement not met - Auth Missing",
        });
      }
      let decoded;
      try {
        decoded = this.verifyToken(token);
      } catch (error) {
        return sendResponse(res, {
          code: StatusCodes.UNAUTHORIZED,
          message: "Security Requirement not met - Unauthorized",
        });
      }
      console.log(decoded);
      if (clearance) {
        if (decoded.clearance < clearance)
          return sendResponse(res, {
            code: StatusCodes.UNAUTHORIZED,
            message: "Security Requirement not met - Restricted",
          });
      }

      if (decoded.clearance < 3) {
        const requestUser = req.params?.userId;

        if (requestUser && Number(requestUser) !== decoded.userId) {
          return sendResponse(res, {
            code: StatusCodes.UNAUTHORIZED,
            message: "Cross-Access restricted",
          });
        }
      }

      res.locals.user = {
        id: decoded.userId as string,
        clearance: decoded.clearance,
        token,
      };

      next();
    };
  }
}

export const jwtHelper = new JwtHelper();
