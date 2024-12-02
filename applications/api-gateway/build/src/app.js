"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createConfig_1 = __importDefault(require("./utils/createConfig"));
const compression_1 = __importDefault(require("compression"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const rate_limit_1 = require("./middlewares/rate-limit");
const proxy_1 = __importDefault(require("./middlewares/proxy"));
const error_handler_1 = require("./middlewares/error-handler");
const consts_1 = require("./utils/consts");
const logger_1 = require("./utils/logger");
const unless_route_1 = __importDefault(require("./middlewares/unless-route"));
const auth_middleware_1 = require("./middlewares/auth-middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookieOption_1 = require("./utils/cookieOption");
const app = (0, express_1.default)();
const currentEnv = process.env.NODE_ENV || "development";
const config = (0, createConfig_1.default)(currentEnv);
// ===================
// Security Middleware
// ===================
app.set("trust proxy", 1);
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, cookie_session_1.default)(cookieOption_1.OptionSession));
// Prevent HTTP Parameter Pollution attacks
app.use((0, hpp_1.default)());
// Prevent Some Security:
// - Stops browsers from sharing your site's vistor data
// - Stops your website from being displayed in a frame
// - Prevent XSS, etc.
app.use((0, helmet_1.default)());
// Only Allow Specific Origin to Access API Gateway (Frontend)
// Mock getConfig function. Replace with your actual config logic.
//config.env === "development" ? "*"
const corsOptions = {
    origin: config.env === "development" ? "http://localhost:8000" : config.clientUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, cors_1.default)(corsOptions));
// Apply Limit Request
(0, rate_limit_1.applyRateLimit)(app);
// Hide Express Server Information
app.disable("x-powered-by");
// ===================
// JWT Middleware
// ===================
app.use((0, unless_route_1.default)("/v1/auth", auth_middleware_1.verifyUser));
// ===================
// Proxy Routes
// ===================
(0, proxy_1.default)(app);
// ====================
// Global Error Handler
// ====================
app.use("*", (req, res, _next) => {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    logger_1.logger.error(`${fullUrl} endpoint does not exist`);
    res
        .status(consts_1.StatusCode.NotFound)
        .json({ message: "The endpoint called does not exist." });
});
// Erorr handlers
app.use(error_handler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map