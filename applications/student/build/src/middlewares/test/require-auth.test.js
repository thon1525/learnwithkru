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
const require_auth_1 = require("../require-auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const base_custom_error_1 = require("../../error/base-custom-error");
const http_status_code_1 = __importDefault(require("../../utils/http-status-code"));
jest.mock("jsonwebtoken");
describe("requireAuth middleware", () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
            cookies: {},
        };
        res = {};
        next = jest.fn();
    });
    it("should call next with a BaseCustomError if no token is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, require_auth_1.requireAuth)(req, res, next);
        expect(next).toHaveBeenCalledWith(new base_custom_error_1.BaseCustomError("Unauthorized", http_status_code_1.default.UNAUTHORIZED));
    }));
    it("should call next with a BaseCustomError if token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        req.cookies = { authenticated: "invalidToken" };
        jsonwebtoken_1.default.verify.mockImplementation(() => {
            throw new base_custom_error_1.BaseCustomError("Invalid token!", http_status_code_1.default.BAD_REQUEST);
        });
        yield (0, require_auth_1.requireAuth)(req, res, next);
        expect(next).toHaveBeenCalledWith(new base_custom_error_1.BaseCustomError("Invalid token!", http_status_code_1.default.BAD_REQUEST));
    }));
    it("should attach the decoded user to the request and call next if token is valid", () => __awaiter(void 0, void 0, void 0, function* () {
        const decodedUser = { id: "userId", email: "user@example.com" };
        req.cookies = { authenticated: "validToken" };
        jsonwebtoken_1.default.verify.mockReturnValue(decodedUser);
        yield (0, require_auth_1.requireAuth)(req, res, next);
        expect(req.user).toEqual(decodedUser);
        expect(next).toHaveBeenCalled();
    }));
    it("should call next with an ApiError if an unexpected error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        req.cookies = { authenticated: "validToken" };
        jsonwebtoken_1.default.verify.mockImplementation(() => {
            throw new Error("Unexpected error");
        });
        yield (0, require_auth_1.requireAuth)(req, res, next);
        expect(next).toHaveBeenCalledWith(new base_custom_error_1.ApiError("Somthing went wrong!"));
    }));
});
//# sourceMappingURL=require-auth.test.js.map