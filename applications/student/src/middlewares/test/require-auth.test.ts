import { Request, Response, NextFunction } from "express";
import { requireAuth } from "../require-auth";
import jwt from "jsonwebtoken";
import { BaseCustomError, ApiError } from "../../error/base-custom-error";
import StatusCode from "../../utils/http-status-code";

jest.mock("jsonwebtoken");

describe("requireAuth middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      cookies: {},
    };
    res = {};
    next = jest.fn();
  });

  it("should call next with a BaseCustomError if no token is provided", async () => {
    await requireAuth(req as Request, res as Response, next);
    
    expect(next).toHaveBeenCalledWith(new BaseCustomError("Unauthorized", StatusCode.UNAUTHORIZED));
  });

  it("should call next with a BaseCustomError if token is invalid", async () => {
    req.cookies = { authenticated: "invalidToken" };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new BaseCustomError("Invalid token!", StatusCode.BAD_REQUEST);
    });

    await requireAuth(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(new BaseCustomError("Invalid token!", StatusCode.BAD_REQUEST));
  });

  it("should attach the decoded user to the request and call next if token is valid", async () => {
    const decodedUser = { id: "userId", email: "user@example.com" };
    req.cookies = { authenticated: "validToken" };
    (jwt.verify as jest.Mock).mockReturnValue(decodedUser);

    await requireAuth(req as Request, res as Response, next);

    expect(req.user).toEqual(decodedUser);
    expect(next).toHaveBeenCalled();
  });

  it("should call next with an ApiError if an unexpected error occurs", async () => {
    req.cookies = { authenticated: "validToken" };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Unexpected error");
    });

    await requireAuth(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(new ApiError("Somthing went wrong!"));
  });
});
