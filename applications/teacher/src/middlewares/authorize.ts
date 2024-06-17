import { NextFunction, Request, Response } from "express";
import { decodedToken } from "../utils/jwt";
import { ApiError, BaseCustomError } from "../error/base-custom-error";
import StatusCode from "../utils/http-status-code";
import { DecodedUser } from "../@types/express-extend.type";
import { logger } from "../utils/logger";

export interface RequestWithUser extends Request {
  user: DecodedUser;
}

export const authorize = (requireRole: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1] as string;
      const decoded = await decodedToken(token);

      const { role } = decoded;
      // const role = ["teacher", "user"];

      logger.info(
        `User Role ${
          Array.isArray(role) ? role.join(", ") : role
        } and requireRole ${requireRole} and is match ${
          Array.isArray(role)
            ? role.some((r) => requireRole.includes(r))
            : requireRole.includes(role)
        }`
      );

      let hasRequiredRole: boolean;
      if (Array.isArray(role)) {
        hasRequiredRole = role.some((r) => requireRole.includes(r));
      } else {
        hasRequiredRole = requireRole.includes(role);
      }

      if (!hasRequiredRole) {
        throw new BaseCustomError(
          "Forbidden - Insufficient permissions",
          StatusCode.FORBIDDEN
        );
      }

      (req as RequestWithUser).user = decoded;

      logger.info(
        `User with role '${
          Array.isArray(role) ? role.join(", ") : role
        }' authorized for '${requireRole}' role`
      );

      next();
    } catch (error: unknown) {
      logger.error("Authorization error:", error);
      if (error instanceof BaseCustomError) {
        next(error);
      } else {
        next(
          new ApiError("Unauthorized - Invalid token", StatusCode.UNAUTHORIZED)
        );
      }
    }
  };
};
