import { rateLimit } from "express-rate-limit";
import express from "express";
import getConfig from "@api-gateway/utils/createConfig";
import { logger } from "@api-gateway/utils/logger";

const currentEnv = process.env.NODE_ENV || "development";
const config = getConfig(currentEnv);
const isDevelopment = config.env === "development";

const RATE_LIMIT_WINDOW_MS = isDevelopment ? 15 * 60 * 1000 : 15 * 60 * 1000; // 15 minutes in milliseconds
const MAX_REQUESTS = isDevelopment ? 10000 : 100; // Higher limit in development for testing

const limiterOptions = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: MAX_REQUESTS,
  message: "Too many requests from this IP, please try again after 15 minutes",
  headers: true, // Send rate limit info in the response headers
  // onLimitReached: (req, res, options) => {
  //   console.warn(`Rate limit exceeded for IP: ${req.ip}`);
  // },
});

export const applyRateLimit = (app: express.Application) => {
  try {
    app.use(limiterOptions);
    logger.info(
      `Rate limiting applied: ${MAX_REQUESTS} requests per ${
        RATE_LIMIT_WINDOW_MS / (1000 * 60)
      } minutes`
    );
  } catch (error) {
    logger.error(`Error applying rate limit middleware ${error}`);
  }
};
