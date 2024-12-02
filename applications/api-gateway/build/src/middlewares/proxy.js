"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_proxy_middleware_1 = require("http-proxy-middleware");
const logger_1 = require("../utils/logger");
const createConfig_1 = __importDefault(require("../utils/createConfig"));
const consts_1 = require("../utils/consts");
const route_defs_1 = require("../route-defs");
const cookieOption_1 = require("../utils/cookieOption");
const currentEnv = process.env.NODE_ENV || "development";
const config = (0, createConfig_1.default)(currentEnv);
// TODO SERVICES
// 1. auth service
// 2. student service
// 3. teacher student
// 4. user service
// Define the proxy rules and targets
const proxyConfigs = {
    [route_defs_1.ROUTE_PATHS.AUTH_SERVICE]: {
        target: config.authServiceUrl,
        pathRewrite: (path, _req) => {
            logger_1.logger.info(`pathRewrite: ${path}`);
            return `${route_defs_1.ROUTE_PATHS.AUTH_SERVICE}${path}`;
        },
        changeOrigin: true,
        selfHandleResponse: true,
        on: {
            proxyReq: (proxyReq, req, _res) => {
                logger_1.logger.info(`Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
                logger_1.logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);
                const expressReq = req;
                // Extract JWT token from session
                const token = expressReq.session.jwt;
                logger_1.logger.info(`Proxy token : ${token}`);
                if (token) {
                    proxyReq.setHeader("Authorization", `Bearer ${token}`);
                }
            },
            proxyRes: (proxyRes, req, res) => {
                let originalBody = [];
                proxyRes.on("data", function (chunk) {
                    originalBody.push(chunk);
                });
                proxyRes.on("end", function () {
                    const bodyString = Buffer.concat(originalBody).toString("utf8");
                    let responseBody;
                    try {
                        console.log("body string", bodyString);
                        responseBody = JSON.parse(bodyString);
                        console.log("ResponeBody:", responseBody);
                        // If Response Error, Not Modified Response
                        if (responseBody.errors) {
                            return res.status(proxyRes.statusCode).json(responseBody);
                        }
                        if (responseBody.redirectUrl) {
                            return res.redirect(responseBody.redirectUrl);
                        }
                        // Store JWT in session
                        if (responseBody.token) {
                            req.session.jwt = responseBody.token;
                            res.cookie("persistent", responseBody.token, cookieOption_1.OptionCookie);
                            delete responseBody.token;
                        }
                        if (responseBody.isLogout) {
                            res.clearCookie("persistent", cookieOption_1.OptionCookie);
                            res.clearCookie("session", cookieOption_1.OptionCookie);
                            res.clearCookie("session.sig", cookieOption_1.OptionCookie);
                        }
                        // Modify response to send  the message to the client
                        res.json({
                            message: responseBody.message,
                        });
                    }
                    catch (error) {
                        return res.status(500).json({ message: "Error parsing response" });
                    }
                });
            },
            error: (err, _req, res) => {
                logger_1.logger.error(`Proxy Error: ${err}`);
                switch (err.code) {
                    case "ECONNREFUSED":
                        res.status(consts_1.StatusCode.ServiceUnavailable).json({
                            message: "The service is temporarily unavailable. Please try again later.",
                        });
                        break;
                    case "ETIMEDOUT":
                        res.status(consts_1.StatusCode.GatewayTimeout).json({
                            message: "The request timed out. Please try again later.",
                        });
                        break;
                    default:
                        res
                            .status(consts_1.StatusCode.InternalServerError)
                            .json({ message: "An internal error occurred." });
                }
            },
        },
    },
    [route_defs_1.ROUTE_PATHS.TEACHER_SERVICE]: {
        target: config.teacherServiceUrl,
        pathRewrite: (path, _req) => {
            return `${route_defs_1.ROUTE_PATHS.TEACHER_SERVICE}${path}`;
        },
        changeOrigin: true,
        selfHandleResponse: true,
        on: {
            proxyReq: (proxyReq, req, _res) => {
                logger_1.logger.info(`Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
                logger_1.logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);
                const expressReq = req;
                // Extract JWT token from session
                const token = expressReq.session.jwt;
                proxyReq.setHeader("Authorization", `Bearer ${token}`);
            },
            proxyRes: (proxyRes, req, res) => {
                let originalBody = [];
                proxyRes.on("data", function (chunk) {
                    originalBody.push(chunk);
                });
                proxyRes.on("end", function () {
                    const bodyString = Buffer.concat(originalBody).toString("utf8");
                    let responseBody;
                    try {
                        logger_1.logger.info(`This is bodystring: ${bodyString}`);
                        responseBody = JSON.parse(bodyString);
                        logger_1.logger.info(`Responebody : ${responseBody}`);
                        // If Response Error, Not Modified Response
                        if (responseBody.errors) {
                            return res.status(proxyRes.statusCode).json(responseBody);
                        }
                        if (responseBody.token) {
                            req.session.jwt = responseBody.token;
                            res.cookie("persistent", responseBody.token, cookieOption_1.OptionCookie);
                            delete responseBody.token;
                        }
                        res.json({
                            message: responseBody.message,
                            data: responseBody.data,
                            detail: responseBody.detail,
                        });
                    }
                    catch (error) {
                        return res.status(500).json({ message: "Error parsing response" });
                    }
                });
            },
            error: (err, _req, res) => {
                logger_1.logger.error(`Proxy Error: ${err}`);
                switch (err.code) {
                    case "ECONNREFUSED":
                        res.status(consts_1.StatusCode.ServiceUnavailable).json({
                            message: "The service is temporarily unavailable. Please try again later.",
                        });
                        break;
                    case "ETIMEDOUT":
                        res.status(consts_1.StatusCode.GatewayTimeout).json({
                            message: "The request timed out. Please try again later.",
                        });
                        break;
                    default:
                        res
                            .status(consts_1.StatusCode.InternalServerError)
                            .json({ message: "An internal error occurred." });
                }
            },
        },
    },
    [route_defs_1.ROUTE_PATHS.STUDENT_SERVICE]: {
        target: config.studentServiceUrl,
        pathRewrite: (path, _req) => {
            return `${route_defs_1.ROUTE_PATHS.STUDENT_SERVICE}${path}`;
        },
        changeOrigin: true,
        selfHandleResponse: true,
        on: {
            proxyReq: (proxyReq, req, _res) => {
                logger_1.logger.info(`Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
                logger_1.logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);
                const expressReq = req;
                // Extract JWT token from session
                const token = expressReq.session.jwt;
                proxyReq.setHeader("Authorization", `Bearer ${token}`);
            },
            proxyRes: (proxyRes, req, res) => {
                let originalBody = [];
                proxyRes.on("data", function (chunk) {
                    originalBody.push(chunk);
                });
                proxyRes.on("end", function () {
                    const bodyString = Buffer.concat(originalBody).toString("utf8");
                    let responseBody;
                    try {
                        responseBody = JSON.parse(bodyString);
                        // If Response Error, Not Modified Response
                        console.log("ResponeBody:", responseBody);
                        if (responseBody.errors) {
                            return res.status(proxyRes.statusCode).json(responseBody);
                        }
                        if (responseBody.token) {
                            req.session.jwt = responseBody.token;
                            res.cookie("persistent", responseBody.token, cookieOption_1.OptionCookie);
                            delete responseBody.token;
                        }
                        // Modify response to send only the message to the client
                        res.json({
                            message: responseBody.message,
                            data: responseBody.data,
                        });
                    }
                    catch (error) {
                        return res.status(500).json({ message: "Error parsing response" });
                    }
                });
            },
            error: (err, _req, res) => {
                logger_1.logger.error(`Proxy Error: ${err}`);
                switch (err.code) {
                    case "ECONNREFUSED":
                        res.status(consts_1.StatusCode.ServiceUnavailable).json({
                            message: "The service is temporarily unavailable. Please try again later.",
                        });
                        break;
                    case "ETIMEDOUT":
                        res.status(consts_1.StatusCode.GatewayTimeout).json({
                            message: "The request timed out. Please try again later.",
                        });
                        break;
                    default:
                        res
                            .status(consts_1.StatusCode.InternalServerError)
                            .json({ message: "An internal error occurred." });
                }
            },
        },
    },
    [route_defs_1.ROUTE_PATHS.USER_SERVICE]: {
        target: config.userServiceUrl,
        pathRewrite: (path, _req) => {
            return `${route_defs_1.ROUTE_PATHS.USER_SERVICE}${path}`;
        },
        changeOrigin: true,
        selfHandleResponse: true,
        on: {
            proxyReq: (proxyReq, req, _res) => {
                logger_1.logger.info(`Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
                logger_1.logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);
                const expressReq = req;
                // Extract JWT token from session
                const token = expressReq.session.jwt;
                proxyReq.setHeader("Authorization", `Bearer ${token}`);
            },
            proxyRes: (proxyRes, _req, res) => {
                let originalBody = [];
                proxyRes.on("data", function (chunk) {
                    originalBody.push(chunk);
                });
                proxyRes.on("end", function () {
                    const bodyString = Buffer.concat(originalBody).toString("utf8");
                    let responseBody;
                    try {
                        responseBody = JSON.parse(bodyString);
                        console.log("ResponeBody:", responseBody);
                        // If Response Error, Not Modified Response
                        if (responseBody.errors) {
                            return res.status(proxyRes.statusCode).json(responseBody);
                        }
                        // Modify response to send only the message to the client
                        res.json({
                            message: responseBody.message,
                            data: responseBody.data,
                        });
                    }
                    catch (error) {
                        return res.status(500).json({ message: "Error parsing response" });
                    }
                });
            },
            error: (err, _req, res) => {
                logger_1.logger.error(`Proxy Error: ${err}`);
                switch (err.code) {
                    case "ECONNREFUSED":
                        res.status(consts_1.StatusCode.ServiceUnavailable).json({
                            message: "The service is temporarily unavailable. Please try again later.",
                        });
                        break;
                    case "ETIMEDOUT":
                        res.status(consts_1.StatusCode.GatewayTimeout).json({
                            message: "The request timed out. Please try again later.",
                        });
                        break;
                    default:
                        res
                            .status(consts_1.StatusCode.InternalServerError)
                            .json({ message: "An internal error occurred." });
                }
            },
        },
    },
};
const applyProxy = (app) => {
    Object.keys(proxyConfigs).forEach((context) => {
        app.use(context, (0, http_proxy_middleware_1.createProxyMiddleware)(proxyConfigs[context]));
    });
};
exports.default = applyProxy;
//# sourceMappingURL=proxy.js.map