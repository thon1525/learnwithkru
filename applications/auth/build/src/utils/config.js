"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const base_custom_error_1 = require("../error/base-custom-error");
const dotenv_1 = __importDefault(require("dotenv"));
function createConfig(configPath) {
    dotenv_1.default.config({ path: configPath });
    // Validate essential configuration
    const requiredConfig = [
        "NODE_ENV",
        "PORT",
        "MONGODB_URL",
        "LOG_LEVEL",
        "RABBITMQ_ENDPOINT",
        "CLIENT_URL",
        "JWT_EXPIRES_IN",
        "API_GATEWAY",
        "FACEBOOK_APP_SECRET",
        "FACEBOOK_APP_ID",
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
        "FACEBOOK_REDIRECT_URI",
        "GOOGLE_REDIRECT_URI",
        "USER_SERVICE",
        "STUDENT_SERVICE",
        "TEACHER_SERVICE",
    ];
    const missingConfig = requiredConfig.filter((key) => !process.env[key]);
    if (missingConfig.length > 0) {
        throw new base_custom_error_1.ApiError(`Missing required environment variables: ${missingConfig.join(", ")}`);
    }
    // Return configuration object
    return {
        env: process.env.NODE_ENV,
        port: process.env.PORT,
        mongoUrl: process.env.MONGODB_URL,
        logLevel: process.env.LOG_LEVEL,
        rabbitMQ: process.env.RABBITMQ_ENDPOINT,
        clientUrl: process.env.CLIENT_URL,
        apiGateway: process.env.API_GATEWAY,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN,
        faceAppId: process.env.FACEBOOK_APP_ID,
        facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        facebookRedirectUrl: process.env.FACEBOOK_REDIRECT_URI,
        googleRedirectUrl: process.env.GOOGLE_REDIRECT_URI,
        userService: process.env.USER_SERVICE,
        studentService: process.env.STUDENT_SERVICE,
        teacherService: process.env.TEACHER_SERVICE,
    };
}
function getConfig(currentEnv = "production") {
    const configPath = path_1.default.join(__dirname, currentEnv === "development"
        ? "../../configs/.env"
        : currentEnv === "staging"
            ? "../../configs/.env.staging"
            : "../../configs/.env.production");
    return createConfig(configPath);
}
exports.default = getConfig;
//# sourceMappingURL=config.js.map