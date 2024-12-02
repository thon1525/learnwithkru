import { NextFunction, Request, Response } from "express";
import APIError from "../errors/api-error";
import { StatusCode } from "../utils/consts";
import { logger } from "../utils/logger";
import { verify } from "jsonwebtoken";
import { publicKey } from "../server";

async function verifyUser(req: Request, _res: Response, next: NextFunction) {
  const sessionCookie = (req as Request).session?.jwt;
  const persistentCookie = (req as Request).cookies?.persistent;

  try {
    if (!sessionCookie && !persistentCookie) {
      logger.error("Token is not available. Gateway Service verifyUser() method error");
      throw new APIError("Please login to access this resource.", StatusCode.Unauthorized);
    }

    // If sessionCookie is not present but persistentCookie is, update sessionCookie
    if (!sessionCookie && persistentCookie) {
      (req as Request).session!.jwt = persistentCookie;
    }

    // Verify either sessionCookie or persistentCookie
    const tokenToVerify = sessionCookie || persistentCookie;
    await verify(tokenToVerify, publicKey, {
      algorithms: ["RS256"],
    });

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    next(error); // Pass the error to Express error handler
  }
}

export { verifyUser };
