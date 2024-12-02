"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../errors/api-error"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
function createConfig(configPath) {
    dotenv_1.default.config({ path: configPath });
    // Validate essential configuration
    const requiredConfig = [
        'NODE_ENV',
        'PORT',
        'CLIENT_URL',
        'LOG_LEVEL',
        'RABBITMQ_ENDPOINT',
        'SENDER_EMAIL',
        'SENDER_EMAIL_PASSWORD',
        'SMTP_HOST',
        'SMTP_PORT',
    ];
    const missingConfig = requiredConfig.filter((key) => !process.env[key]);
    if (missingConfig.length > 0) {
        throw new api_error_1.default(`Missing required environment variables: ${missingConfig.join(', ')}`);
    }
    // Return configuration object
    return {
        env: process.env.NODE_ENV,
        port: process.env.PORT,
        clientUrl: process.env.CLIENT_URL,
        logLevel: process.env.LOG_LEVEL,
        rabbitMQ: process.env.RABBITMQ_ENDPOINT,
        senderEmail: process.env.SENDER_EMAIL,
        senderEmailPassword: process.env.SENDER_EMAIL_PASSWORD,
        smtpHost: process.env.SMTP_HOST,
        smtpPort: process.env.SMTP_PORT,
    };
}
const getConfig = (currentEnv = 'production') => {
    const configPath = currentEnv === 'development'
        ? path_1.default.join(__dirname, `../../configs/.env`)
        : path_1.default.join(__dirname, `../../configs/.env.production`);
    return createConfig(configPath);
};
exports.default = getConfig;
//# sourceMappingURL=config.js.map