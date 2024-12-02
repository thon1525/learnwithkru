"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const base_custom_error_1 = __importDefault(require("./base-custom-error"));
class DuplicateError extends base_custom_error_1.default {
    constructor(message) {
        super(message, http_status_code_1.default.Conflict);
        Object.setPrototypeOf(this, DuplicateError.prototype);
    }
    getStatusCode() {
        return this.statusCode;
    }
    serializeErrorOutput() {
        return { errors: [{ message: this.message }] };
    }
}
exports.default = DuplicateError;
//# sourceMappingURL=duplicate-error.js.map