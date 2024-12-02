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
    "AUTH_SERVICE_GET",
    "API_GATEWAY",
    "TEACHER_SERVICE",
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
    authService: process.env.AUTH_SERVICE_GET,
    teacherService: process.env.TEACHER_SERVICE,
    studentService: process.env.STUDENT_SERVICE
  };
}

const getConfig = (currentEnv: string = "production") => {
  const configPath =
    currentEnv === "development"
      ? path.join(__dirname, `../../configs/.env`)
      : path.join(__dirname, `../../configs/.env.production`);
  return createConfig(configPath);
};

export default getConfig;
