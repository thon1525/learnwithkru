"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const base_custom_error_1 = require("../error/base-custom-error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, _res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.authenticated;
        if (!token) {
            throw new base_custom_error_1.BaseCustomError("Unauthorized", http_status_code_1.default.UNAUTHORIZED);
        }
        const secretKey = process.env.SECRET_KEY;
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        if (!decoded) {
            throw new base_custom_error_1.BaseCustomError("Invalid token!", http_status_code_1.default.BAD_REQUEST);
        }
        req.user = decoded;
        _next();
    }
    catch (error) {
        if (error instanceof base_custom_error_1.BaseCustomError) {
            _next(error);
        }
        _next(new base_custom_error_1.ApiError("Somthing went wrong!"));
    }
});
exports.requireAuth = requireAuth;
//# sourceMappingURL=require-auth.js.map