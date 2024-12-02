"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.BaseCustomError = void 0;
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
class BaseCustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // Ensure the error prototype is set correctly
        Object.setPrototypeOf(this, BaseCustomError.prototype);
    }
    // This method will be used to send the error response
    // Override it in subclasses if necessary
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.BaseCustomError = BaseCustomError;
class ApiError extends BaseCustomError {
    constructor(message, statusCode = http_status_code_1.default.INTERNAL_SERVER_ERROR) {
        super(message, statusCode);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=base-custom-error.js.map