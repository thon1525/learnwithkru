import { CookieOptions } from "express";
import getConfig from "./createConfig";

const currentEnv = process.env.NODE_ENV || "development";
const config = getConfig(currentEnv);

export const OptionCookie: CookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  httpOnly: true,
  secure: config.env !== "development", // set to true in production
  sameSite: config.env !== "development" ? "lax" : "none", // 'lax' in production, 'none' in development
  domain: config.env !== "development" ? ".learnwithkru.com" : undefined, // Set domain in production, undefined in development
  path: "/", // Ensure the path is set to the root
};

export const OptionSession: CookieSessionInterfaces.CookieSessionOptions = {
  name: "session",
  keys: [`${config.cookieSecretKeyOne}`, `${config.cookieSecretKeyTwo}`],
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  secure: config.env !== "development", // update with value from config
  ...(config.env !== "development" && {
    sameSite: "none",
  }),
  domain: config.env !== "development" ? ".learnwithkru.com" : undefined, // Set domain in production, undefined in development
  path: "/",
  overwrite: true,
};
