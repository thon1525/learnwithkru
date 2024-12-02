import express, { Request, Response } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { logger } from "../utils/logger";
import { ClientRequest, IncomingMessage } from "http";
import getConfig from "../utils/createConfig";
import { StatusCode } from "../utils/consts";
import { ROUTE_PATHS } from "@api-gateway/route-defs";
import { OptionCookie } from "@api-gateway/utils/cookieOption";

interface ProxyConfig {
  [context: string]: Options<IncomingMessage, Response>;
}

declare module "express" {
  interface Request {
    session?: any; // Adjust the type based on your session configuration
  }
}

interface NetworkError extends Error {
  code?: string;
}

const currentEnv = process.env.NODE_ENV || "development";
const config = getConfig(currentEnv);

// TODO SERVICES
// 1. auth service
// 4. user service

// Define the proxy rules and targets
const proxyConfigs: ProxyConfig = {
  [ROUTE_PATHS.AUTH_SERVICE]: {
    target: config.authServiceUrl as string,
    pathRewrite: (path, _req) => {
      logger.info(`pathRewrite: ${path}`);
      return `${ROUTE_PATHS.AUTH_SERVICE}${path}`;
    },
    changeOrigin: true,
    selfHandleResponse: true,
    on: {
      proxyReq: (
        proxyReq: ClientRequest,
        req: IncomingMessage,
        _res: Response
      ) => {
        logger.info(
          `Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
        );
        logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);
        const expressReq = req as Request;

        const session = expressReq.session?.jwt;
        const persistent = expressReq.cookies?.persistent;

        if (session) {
          logger.info(`Proxy session: ${session}`);
          proxyReq.setHeader("Authorization", `Bearer ${session}`);
        } else if (persistent) {
          logger.info(`Proxy using persistent cookie: ${persistent}`);
          proxyReq.setHeader("Authorization", `Bearer ${persistent}`);
        }
        logger.info(
          "Neither session nor persistent cookie available for proxy request."
        );
      },
      proxyRes: (proxyRes, req, res) => {
        let originalBody: Buffer[] = [];
        proxyRes.on("data", function (chunk: Buffer) {
          originalBody.push(chunk);
        });
        proxyRes.on("end", function () {
          const bodyString = Buffer.concat(originalBody).toString("utf8");
          let responseBody: {
            message?: string;
            data?: Array<object>;
            token?: string;
            redirectUrl?: string;
            errors?: Array<object>;
            isLogout?: boolean;
          };

          try {
            logger.info(`body string ${bodyString}`);
            responseBody = JSON.parse(bodyString);
            logger.info(`ResponeBody: ${responseBody}`);
            // If Response Error, Not Modified Response
            if (responseBody.errors) {
              return res.status(proxyRes.statusCode!).json(responseBody);
            }
            if (responseBody.redirectUrl) {
              return res.redirect(responseBody.redirectUrl);
            }

            // Store JWT in session
            if (responseBody.token) {
              (req as Request).session!.jwt = responseBody.token;
              res.cookie("persistent", responseBody.token, OptionCookie);
              delete responseBody.token;
            }
            if (responseBody.isLogout) {
              // Clear the persistent cookie
              logger.info("successfull")
              res.clearCookie("persistent");
              if ((req as Request).session!.jwt) {
                try {
                  // Manually clear the session data
                  (req as Request).session = null;

                  return res.end(); // End response after logout
                } catch (error) {
                  logger.error("Error clearing session:", error);
                  return res
                    .status(500)
                    .json({ message: "Error clearing session" });
                }
              }
            }
            // Modify response to send  the message to the client
            res.json({
              message: responseBody.message,
            });
          } catch (error) {
            return res.status(500).json({ message: "Error parsing response" });
          }
        });
      },
      error: (err: NetworkError, _req, res) => {
        logger.error(`Proxy Error: ${err}`);
        switch (err.code) {
          case "ECONNREFUSED":
            (res as Response).status(StatusCode.ServiceUnavailable).json({
              message:
                "The service is temporarily unavailable. Please try again later.",
            });
            break;
          case "ETIMEDOUT":
            (res as Response).status(StatusCode.GatewayTimeout).json({
              message: "The request timed out. Please try again later.",
            });
            break;
          default:
            (res as Response)
              .status(StatusCode.InternalServerError)
              .json({ message: "An internal error occurred." });
        }
      },
    },
  },
  [ROUTE_PATHS.TEACHER_SERVICE]: {
    target: config.teacherServiceUrl as string,
    pathRewrite: (path, _req) => {
      return `${ROUTE_PATHS.TEACHER_SERVICE}${path}`;
    },
    changeOrigin: true,
    selfHandleResponse: true,
    on: {
      proxyReq: (
        proxyReq: ClientRequest,
        req: IncomingMessage,
        _res: Response
      ) => {
        logger.info(
          `Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
        );
        logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);
        const expressReq = req as Request;

        // Extract JWT token from session
        const token = expressReq.session!.jwt;
        proxyReq.setHeader("Authorization", `Bearer ${token}`);
      },
      proxyRes: (proxyRes, req, res) => {
        let originalBody: Buffer[] = [];
        proxyRes.on("data", function (chunk: Buffer) {
          originalBody.push(chunk);
        });
        proxyRes.on("end", function () {
          const bodyString = Buffer.concat(originalBody).toString("utf8");
          let responseBody: {
            message?: string;
            token?: string;
            data?: Array<object>;
            errors?: Array<object>;
            detail?: object;
          };
          try {
            logger.info(`This is bodystring: ${bodyString}`);
            responseBody = JSON.parse(bodyString);
            logger.info(`Responebody : ${responseBody}`);

            // If Response Error, Not Modified Response
            if (responseBody.errors) {
              return res.status(proxyRes.statusCode!).json(responseBody);
            }

            if (responseBody.token) {
              (req as Request).session!.jwt = responseBody.token;
              res.cookie("persistent", responseBody.token, OptionCookie);
              delete responseBody.token;
            }
            res.json({
              message: responseBody.message,
              data: responseBody.data,
              detail: responseBody.detail,
            });
          } catch (error) {
            return res.status(500).json({ message: "Error parsing response" });
          }
        });
      },
      error: (err: NetworkError, _req, res) => {
        logger.error(`Proxy Error: ${err}`);
        switch (err.code) {
          case "ECONNREFUSED":
            (res as Response).status(StatusCode.ServiceUnavailable).json({
              message:
                "The service is temporarily unavailable. Please try again later.",
            });
            break;
          case "ETIMEDOUT":
            (res as Response).status(StatusCode.GatewayTimeout).json({
              message: "The request timed out. Please try again later.",
            });
            break;
          default:
            (res as Response)
              .status(StatusCode.InternalServerError)
              .json({ message: "An internal error occurred." });
        }
      },
    },
  },
  [ROUTE_PATHS.STUDENT_SERVICE]: {
    target: config.studentServiceUrl as string,
    pathRewrite: (path, _req) => {
      return `${ROUTE_PATHS.STUDENT_SERVICE}${path}`;
    },
    changeOrigin: true,
    selfHandleResponse: true,
    on: {
      proxyReq: (
        proxyReq: ClientRequest,
        req: IncomingMessage,
        _res: Response
      ) => {
        logger.info(
          `Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
        );
        logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);
        const expressReq = req as Request;

        // Extract JWT token from session
        const token = expressReq.session!.jwt;
        proxyReq.setHeader("Authorization", `Bearer ${token}`);
      },
      proxyRes: (proxyRes, req, res) => {
        let originalBody: Buffer[] = [];
        proxyRes.on("data", function (chunk: Buffer) {
          originalBody.push(chunk);
        });
        proxyRes.on("end", function () {
          const bodyString = Buffer.concat(originalBody).toString("utf8");
          let responseBody: {
            message?: string;
            token?: string;
            data?: Array<object>;
            errors?: Array<object>;
          };
          try {
            responseBody = JSON.parse(bodyString);
            // If Response Error, Not Modified Response
            console.log("ResponeBody:", responseBody);

            if (responseBody.errors) {
              return res.status(proxyRes.statusCode!).json(responseBody);
            }
            if (responseBody.token) {
              (req as Request).session!.jwt = responseBody.token;
              res.cookie("persistent", responseBody.token, OptionCookie);
              delete responseBody.token;
            }
            // Modify response to send only the message to the client
            res.json({
              message: responseBody.message,
              data: responseBody.data,
            });
          } catch (error) {
            return res.status(500).json({ message: "Error parsing response" });
          }
        });
      },
      error: (err: NetworkError, _req, res) => {
        logger.error(`Proxy Error: ${err}`);
        switch (err.code) {
          case "ECONNREFUSED":
            (res as Response).status(StatusCode.ServiceUnavailable).json({
              message:
                "The service is temporarily unavailable. Please try again later.",
            });
            break;
          case "ETIMEDOUT":
            (res as Response).status(StatusCode.GatewayTimeout).json({
              message: "The request timed out. Please try again later.",
            });
            break;
          default:
            (res as Response)
              .status(StatusCode.InternalServerError)
              .json({ message: "An internal error occurred." });
        }
      },
    },
  },
  [ROUTE_PATHS.USER_SERVICE]: {
    target: config.userServiceUrl as string,
    pathRewrite: (path, _req) => {
      return `${ROUTE_PATHS.USER_SERVICE}${path}`;
    },
    changeOrigin: true,
    selfHandleResponse: true,
    on: {
      proxyReq: (
        proxyReq: ClientRequest,
        req: IncomingMessage,
        _res: Response
      ) => {
        logger.info(
          `Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
        );
        logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);
        const expressReq = req as Request;

        // Extract JWT token from session
        const token = expressReq.session!.jwt;
        proxyReq.setHeader("Authorization", `Bearer ${token}`);
      },
      proxyRes: (proxyRes, _req, res) => {
        let originalBody: Buffer[] = [];
        proxyRes.on("data", function (chunk: Buffer) {
          originalBody.push(chunk);
        });
        proxyRes.on("end", function () {
          const bodyString = Buffer.concat(originalBody).toString("utf8");
          let responseBody: {
            message?: string;
            data?: Array<object>;
            errors?: Array<object>;
          };
          try {
            responseBody = JSON.parse(bodyString);
            console.log("ResponeBody:", responseBody);

            // If Response Error, Not Modified Response
            if (responseBody.errors) {
              return res.status(proxyRes.statusCode!).json(responseBody);
            }
            // Modify response to send only the message to the client
            res.json({
              message: responseBody.message,
              data: responseBody.data,
            });
          } catch (error) {
            return res.status(500).json({ message: "Error parsing response" });
          }
        });
      },
      error: (err: NetworkError, _req, res) => {
        logger.error(`Proxy Error: ${err}`);
        switch (err.code) {
          case "ECONNREFUSED":
            (res as Response).status(StatusCode.ServiceUnavailable).json({
              message:
                "The service is temporarily unavailable. Please try again later.",
            });
            break;
          case "ETIMEDOUT":
            (res as Response).status(StatusCode.GatewayTimeout).json({
              message: "The request timed out. Please try again later.",
            });
            break;
          default:
            (res as Response)
              .status(StatusCode.InternalServerError)
              .json({ message: "An internal error occurred." });
        }
      },
    },
  },
};

const applyProxy = (app: express.Application) => {
  Object.keys(proxyConfigs).forEach((context: string) => {
    app.use(context, createProxyMiddleware(proxyConfigs[context]));
  });
};

export default applyProxy;
