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
exports.authorize = void 0;
const jwt_1 = require("../utils/jwt");
const base_custom_error_1 = require("../error/base-custom-error");
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const logger_1 = require("../utils/logger");
const authorize = (requireRole) => {
    return (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const decoded = yield (0, jwt_1.decodedToken)(token);
            const { role } = decoded;
            // const role = ["teacher", "user"];
            logger_1.logger.info(`User Role ${Array.isArray(role) ? role.join(", ") : role} and requireRole ${requireRole} and is match ${Array.isArray(role)
                ? role.some((r) => requireRole.includes(r))
                : requireRole.includes(role)}`);
            let hasRequiredRole;
            if (Array.isArray(role)) {
                hasRequiredRole = role.some((r) => requireRole.includes(r));
            }
            else {
                hasRequiredRole = requireRole.includes(role);
            }
            if (!hasRequiredRole) {
                throw new base_custom_error_1.BaseCustomError("Forbidden - Insufficient permissions", http_status_code_1.default.FORBIDDEN);
            }
            req.user = decoded;
            logger_1.logger.info(`User with role '${Array.isArray(role) ? role.join(", ") : role}' authorized for '${requireRole}' role`);
            next();
        }
        catch (error) {
            logger_1.logger.error("Authorization error:", error);
            if (error instanceof base_custom_error_1.BaseCustomError) {
                next(error);
            }
            else {
                next(new base_custom_error_1.ApiError("Unauthorized - Invalid token", http_status_code_1.default.UNAUTHORIZED));
            }
        }
    });
};
exports.authorize = authorize;
//# sourceMappingURL=authorize.js.map