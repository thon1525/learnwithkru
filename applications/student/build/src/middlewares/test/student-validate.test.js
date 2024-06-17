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
const zod_1 = require("zod");
const student_validate_1 = require("../student-validate");
const base_custom_error_1 = require("../../error/base-custom-error");
const http_status_code_1 = __importDefault(require("../../utils/http-status-code"));
// Mock request, response, and next function
const mockRequest = (body) => ({
    body,
});
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};
const mockNext = () => jest.fn();
describe('studentValidate middleware', () => {
    const schema = zod_1.z.object({
        name: zod_1.z.string().nonempty("Name is required"),
        age: zod_1.z.number().int().positive("Age must be a positive integer"),
    });
    it('should call next() if the validation passes', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ name: 'John Doe', age: 25 });
        const res = mockResponse();
        const next = mockNext();
        yield (0, student_validate_1.studentValidate)(schema)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalledWith(expect.any(Error));
    }));
    it('should call next() with BaseCustomError if validation fails', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ name: '', age: -5 });
        const res = mockResponse();
        const next = mockNext();
        yield (0, student_validate_1.studentValidate)(schema)(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(base_custom_error_1.BaseCustomError));
        const error = next.mock.calls[0][0];
        expect(error.statusCode).toBe(http_status_code_1.default.UNPROCESSABLE_ENTITY);
        expect(error.message).toContain('name is Name is required');
        expect(error.message).toContain('age is Age must be a positive integer');
    }));
    it('should call next() with BaseCustomError if name is empty and age is null', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ name: '', age: null });
        const res = mockResponse();
        const next = mockNext();
        yield (0, student_validate_1.studentValidate)(schema)(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(base_custom_error_1.BaseCustomError));
        const error = next.mock.calls[0][0];
        expect(error.statusCode).toBe(http_status_code_1.default.UNPROCESSABLE_ENTITY);
        expect(error.message).toContain('name is Name is required');
        expect(error.message).toContain('age is Expected number');
    }));
    it('should call next() with ApiError if an unknown error occurs', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock schema.parse to throw an unknown error
        const req = mockRequest({ name: 'John Doe', age: 25 });
        const res = mockResponse();
        const next = mockNext();
        const errorThrowingSchema = {
            parse: () => { throw new base_custom_error_1.ApiError('Unknown error'); }
        };
        yield (0, student_validate_1.studentValidate)(errorThrowingSchema)(req, res, next);
        const error = next.mock.calls[0][0];
        expect(error.message).toBe("Something went wrong!");
    }));
});
//# sourceMappingURL=student-validate.test.js.map