"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const createConfig_1 = __importDefault(require("./createConfig"));
const currentEnv = process.env.NODE_ENV || "development";
const config = (0, createConfig_1.default)(currentEnv);
exports.options = Object.assign({ httpOnly: true, secure: process.env.NODE_ENV !== "development", maxAge: 30.44 * 24 * 60 * 60 * 1000 }, (config.env !== "development" && {
    sameSite: "strict",
}));
//# sourceMappingURL=persistenCookieOption.js.map