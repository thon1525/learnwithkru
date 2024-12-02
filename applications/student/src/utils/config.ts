import path from "path";
import dotenv from "dotenv";
import { ApiError } from "../error/base-custom-error";

function createConfig(configPath: string) {
  dotenv.config({ path: configPath });

  // Validate essential configuration
  const requiredConfig = [
    "NODE_ENV",
    "PORT",
    "MONGODB_URL",
    "LOG_LEVEL",
    "USER_SERVICE",
    "API_GATEWAY",
    "JWT_EXPIRES_IN",
  ];
  const missingConfig = requiredConfig.filter((key) => !process.env[key]);

  if (missingConfig.length > 0) {
    throw new ApiError(
      `Missing required environment variables: ${missingConfig.join(", ")}`
    );
  }

  // Return configuration object
  return {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongoUrl: process.env.MONGODB_URL,
    logLevel: process.env.LOG_LEVEL,
    apiGateway: process.env.API_GATEWAY,
    userService: process.env.USER_SERVICE,
    cookieSecretKeyOne: process.env.COOKIE_SECRET_KEY_ONE,
    cookieSecretKeyTwo: process.env.COOKIE_SECRET_KEY_TWO,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  };
}

const getConfig = (currentEnv: string = "production") => {
  const configPath = path.join(
    __dirname,
    currentEnv === "development"
      ? "../../configs/.env"
      : "../../configs/.env.production"
  );
  return createConfig(configPath);
};

export default getConfig;
