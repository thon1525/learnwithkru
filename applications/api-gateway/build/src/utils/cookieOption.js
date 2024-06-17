"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionSession = exports.OptionCookie = void 0;
const createConfig_1 = __importDefault(require("./createConfig"));
const currentEnv = process.env.NODE_ENV || "development";
const config = (0, createConfig_1.default)(currentEnv);
exports.OptionCookie = {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    httpOnly: true,
    secure: config.env !== "development", // set to true in production
    sameSite: config.env !== "development" ? "lax" : "none", // 'lax' in production, 'none' in development
    domain: config.env !== "development" ? ".learnwithkru.com" : undefined, // Set domain in production, undefined in development
    path: "/", // Ensure the path is set to the root
};
exports.OptionSession = Object.assign(Object.assign({ name: "session", keys: [`${config.cookieSecretKeyOne}`, `${config.cookieSecretKeyTwo}`], httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: config.env !== "development" }, (config.env !== "development" && {
    sameSite: "none",
})), { domain: config.env !== "development" ? ".learnwithkru.com" : undefined, path: "/" });
//# sourceMappingURL=cookieOption.js.map