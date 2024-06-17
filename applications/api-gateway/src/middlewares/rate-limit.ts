import { rateLimit } from "express-rate-limit";
import express from "express";
import getConfig from "@api-gateway/utils/createConfig";

const currentEnv = process.env.NODE_ENV || "development";
const config = getConfig(currentEnv);
const isDevelopment = config.env === "development";
const RATE_LIMIT_WINDOW_MS = isDevelopment ? undefined : 15 * 60 * 1000; // 15 minutes in milliseconds
const MAX_REQUESTS = isDevelopment ? undefined : 100; // Limit each IP to 100 requests per windowMs

const limiterOptions = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: MAX_REQUESTS,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

export const applyRateLimit = (app: express.Application) => {
  app.use(limiterOptions);
};
