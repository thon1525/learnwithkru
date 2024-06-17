"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const api_error_1 = __importDefault(require("../errors/api-error"));
const path_1 = __importDefault(require("path"));
function createConfig(configPath) {
    dotenv_1.default.config({ path: configPath });
    // Validate essential configuration
    const requiredConfig = [
        "NODE_ENV",
        "PORT",
        "LOG_LEVEL",
        "RABBITMQ_ENDPOINT",
        "CLIENT_URL",
        "COOKIE_SECRET_KEY_ONE",
        "COOKIE_SECRET_KEY_TWO",
        "AUTH_SERVICE_URL",
        "USER_SERVICE_URL",
        "TEACHER_SERVICE_URL",
        "STUDENT_SERVICE_URL",
        "NOTIFICATION_SERVICE_URL",
    ];
    const missingConfig = requiredConfig.filter((key) => !process.env[key]);
    if (missingConfig.length > 0) {
        throw new api_error_1.default(`Missing required environment variables: ${missingConfig.join(", ")}`);
    }
    // Return configuration object
    return {
        env: process.env.NODE_ENV,
        port: process.env.PORT,
        logLevel: process.env.LOG_LEVEL,
        rabbitMQ: process.env.RABBITMQ_ENDPOINT,
        clientUrl: process.env.CLIENT_URL,
        cookieSecretKeyOne: process.env.COOKIE_SECRET_KEY_ONE,
        cookieSecretKeyTwo: process.env.COOKIE_SECRET_KEY_TWO,
        authServiceUrl: process.env.AUTH_SERVICE_URL,
        userServiceUrl: process.env.USER_SERVICE_URL,
        teacherServiceUrl: process.env.TEACHER_SERVICE_URL,
        studentServiceUrl: process.env.STUDENT_SERVICE_URL,
        notificationUrl: process.env.NOTIFICATION_SERVICE_URL,
        cookiePersistentSecretKey: process.env.COOKIE_PERSISTENT_KEY,
    };
}
const getConfig = (currentEnv = "production") => {
    const configPath = currentEnv === "development"
        ? path_1.default.join(__dirname, `../../configs/.env`)
        : path_1.default.join(__dirname, `../../configs/.env.production`);
    return createConfig(configPath);
};
exports.default = getConfig;
//# sourceMappingURL=createConfig.js.map