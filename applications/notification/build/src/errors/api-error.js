"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const base_custom_error_1 = __importDefault(require("./base-custom-error"));
// USE CASE:
// 1. Unexpected Server Error
// 2. Fallback Error Handler
// 3. Generic Server Error
class ApiError extends base_custom_error_1.default {
    constructor(message, statusCode = http_status_code_1.default.InternalServerError) {
        super(message, statusCode);
        Object.setPrototypeOf(this, ApiError.prototype);
    }
    getStatusCode() {
        return this.statusCode;
    }
    serializeErrorOutput() {
        return { errors: [{ message: this.message }] };
    }
}
exports.default = ApiError;
//# sourceMappingURL=api-error.js.map