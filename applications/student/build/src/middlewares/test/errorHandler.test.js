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
Object.defineProperty(exports, "__esModule", { value: true });
const base_custom_error_1 = require("../../error/base-custom-error");
const errorsHandler_1 = require("../errorsHandler");
describe('errorHandler Middleware', () => {
    it('should handle BaseCustomError correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock request, response, and next function
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        // Create an instance of BaseCustomError
        const error = new base_custom_error_1.BaseCustomError('Test error message', 400);
        // Call the errorHandler middleware
        yield (0, errorsHandler_1.errorHandler)(error, req, res, next);
        // Assertions
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            errors: {
                message: 'Test error message',
                code: 400
            }
        });
        expect(next).toHaveBeenCalled();
    }));
    it('should call next middleware if error is not BaseCustomError', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock request, response, and next function
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        // Create a generic error
        const error = new Error('Generic error');
        // Call the errorHandler middleware
        yield (0, errorsHandler_1.errorHandler)(error, req, res, next);
        // Assertions
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=errorHandler.test.js.map