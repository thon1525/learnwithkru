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
const jwt_1 = require("../jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const base_custom_error_1 = require("../../error/base-custom-error");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const http_status_code_1 = __importDefault(require("../http-status-code"));
const config_1 = __importDefault(require("../config"));
// Mock the dependencies
const config = (0, config_1.default)();
jest.mock('jsonwebtoken');
const privateKeyPath = path_1.default.join(__dirname, "../../../private_key.pem");
const privateKey = fs_1.default.readFileSync(privateKeyPath, 'utf8');
describe('auth utils', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('generateSignature', () => {
        it('should generate a valid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockId = '12345';
            const mockToken = 'mockToken';
            jsonwebtoken_1.default.sign.mockImplementation(() => {
                return mockToken;
            });
            const token = yield (0, jwt_1.generateSignature)({ _id: mockId });
            expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith({ payload: { id: mockId, role: 'student' } }, privateKey, { expiresIn: config.jwtExpiresIn, algorithm: 'RS256' });
            expect(token).toBe(mockToken);
        }));
        it('should throw a custom error when jwt.sign fails', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockId = '12345';
            const mockError = new base_custom_error_1.BaseCustomError('Unknown error occurred', http_status_code_1.default.NOT_ACCEPTABLE);
            jsonwebtoken_1.default.sign.mockImplementation(() => {
                throw mockError;
            });
            yield expect((0, jwt_1.generateSignature)({ _id: mockId })).rejects.toThrow(base_custom_error_1.BaseCustomError);
        }));
    });
    describe('decodedToken', () => {
        it('should decode a token and return the payload', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockToken = 'mockToken';
            const mockPayload = { payload: { id: '12345', role: 'student' } };
            jsonwebtoken_1.default.decode.mockReturnValue(mockPayload);
            const payload = yield (0, jwt_1.decodedToken)(mockToken);
            expect(jsonwebtoken_1.default.decode).toHaveBeenCalledWith(mockToken);
            expect(payload).toEqual(mockPayload.payload);
        }));
        it('should throw an error when jwt.decode fails', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockToken = 'mockToken';
            jsonwebtoken_1.default.decode.mockImplementation(() => {
                throw new base_custom_error_1.BaseCustomError('Mock decode error', http_status_code_1.default.NOT_ACCEPTABLE);
            });
            yield expect((0, jwt_1.decodedToken)(mockToken)).rejects.toThrow('Mock decode error');
        }));
    });
});
//# sourceMappingURL=jwt.test.js.map