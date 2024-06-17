"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import path from 'path';
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("../config")); // Adjust the path to your getConfig file
const base_custom_error_1 = require("../../error/base-custom-error"); // Adjust the path to your ApiError file
// Mocking dotenv
jest.mock('dotenv', () => ({
    config: jest.fn(),
}));
describe('getConfig', () => {
    const originalEnv = process.env;
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
        process.env = Object.assign({}, originalEnv); // Reset process.env to original values
    });
    afterAll(() => {
        process.env = originalEnv; // Restore the original environment
    });
    it('should throw an error if required environment variables are missing', () => {
        dotenv_1.default.config.mockReturnValue({ parsed: {} });
        const requiredConfig = ["NODE_ENV", "PORT", "MONGODB_URL", "LOG_LEVEL", "USER_SERVICE"];
        const missingConfig = requiredConfig.filter((key) => !process.env[key]);
        expect(() => (0, config_1.default)('development')).toThrow(new base_custom_error_1.ApiError(`Missing required environment variables: ${missingConfig.join(", ")}`));
    });
    it('should return configuration object if all required environment variables are present', () => {
        process.env.NODE_ENV = 'development';
        process.env.PORT = '3000';
        process.env.MONGODB_URL = 'mongodb://localhost:27017';
        process.env.LOG_LEVEL = 'debug';
        process.env.USER_SERVICE = 'http://localhost:4000';
        process.env.API_GATEWAY = 'http://localhost:5000';
        process.env.COOKIE_SECRET_KEY_ONE = 'secretkey1';
        process.env.COOKIE_SECRET_KEY_TWO = 'secretkey2';
        process.env.JWT_EXPIRES_IN = '1h';
        dotenv_1.default.config.mockReturnValue({ parsed: process.env });
        const config = (0, config_1.default)('development');
        expect(config).toEqual({
            env: 'development',
            port: '3000',
            mongoUrl: 'mongodb://localhost:27017',
            logLevel: 'debug',
            apiGateway: 'http://localhost:5000',
            userService: 'http://localhost:4000',
            cookieSecretKeyOne: 'secretkey1',
            cookieSecretKeyTwo: 'secretkey2',
            jwtExpiresIn: '1h',
        });
    });
    // it('should use the correct config path based on environment', () => {
    //  // const pathSpy = jest.spyOn(path, 'join');
    //   // Call getConfig to trigger the path.join call
    //   getConfig('development');
    //   // expect(pathSpy).toHaveBeenCalledWith(__dirname, `../../configs/.env`);
    // });
});
//# sourceMappingURL=config.test.js.map