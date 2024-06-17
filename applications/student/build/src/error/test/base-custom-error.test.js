"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_code_1 = __importDefault(require("../../utils/http-status-code"));
const base_custom_error_1 = require("../base-custom-error");
describe('BaseCustomError', () => {
    it('should set the message and status code', () => {
        const message = 'Test error message';
        const statusCode = 400;
        const error = new base_custom_error_1.BaseCustomError(message, statusCode);
        expect(error.message).toBe(message);
        expect(error.statusCode).toBe(statusCode);
        expect(error.serializeErrors()).toEqual([{ message }]);
    });
    it('should set the correct prototype', () => {
        const error = new base_custom_error_1.BaseCustomError('Test', 400);
        expect(error).toBeInstanceOf(base_custom_error_1.BaseCustomError);
        expect(error).toBeInstanceOf(Error);
    });
});
describe('ApiError', () => {
    it('should set the message and default status code', () => {
        const message = 'API error message';
        const error = new base_custom_error_1.ApiError(message);
        expect(error.message).toBe(message);
        expect(error.statusCode).toBe(http_status_code_1.default.INTERNAL_SERVER_ERROR);
        expect(error.serializeErrors()).toEqual([{ message }]);
    });
    it('should allow custom status code', () => {
        const message = 'Custom API error message';
        const statusCode = 401;
        const error = new base_custom_error_1.ApiError(message, statusCode);
        expect(error.message).toBe(message);
        expect(error.statusCode).toBe(statusCode);
    });
});
//# sourceMappingURL=base-custom-error.test.js.map