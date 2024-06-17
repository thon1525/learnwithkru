"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const base_custom_error_1 = require("../error/base-custom-error");
function createConfig(configPath) {
    dotenv_1.default.config({ path: configPath });
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
        throw new base_custom_error_1.ApiError(`Missing required environment variables: ${missingConfig.join(", ")}`);
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
const getConfig = (currentEnv = "production") => {
    const configPath = path_1.default.join(__dirname, currentEnv === "development"
        ? "../../configs/.env"
        : "../../configs/.env.production");
    return createConfig(configPath);
};
exports.default = getConfig;
//# sourceMappingURL=config.js.map