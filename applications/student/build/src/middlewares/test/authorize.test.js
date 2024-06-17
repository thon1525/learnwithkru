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
// Mock the decodedToken and logger functions correctly
jest.mock('../../utils/jwt', () => ({
    decodedToken: jest.fn()
}));
// Import your modules
const authorize_1 = require("../authorize");
const jwt_1 = require("../../utils/jwt");
describe('authorize middleware', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
            headers: {
                authorization: 'Bearer valid_token',
            },
        };
        res = {};
        next = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call next with no arguments if the user has sufficient permissions', () => __awaiter(void 0, void 0, void 0, function* () {
        const userRole = 'admin';
        const requiredRoles = ['admin', 'superadmin'];
        // Correctly cast decodedToken and mock its resolved value
        jwt_1.decodedToken.mockResolvedValue({ role: userRole });
        // Get the middleware function using the required roles
        const middleware = (0, authorize_1.authorize)(requiredRoles);
        // Execute the middleware with the mock request, response, and next function
        yield middleware(req, res, next);
        // Assertions to check if everything was called as expected
        expect(req.user).toEqual({ role: userRole });
        expect(next).toHaveBeenCalledWith();
    }));
});
//# sourceMappingURL=authorize.test.js.map