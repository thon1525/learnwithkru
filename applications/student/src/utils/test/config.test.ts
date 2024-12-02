// import path from 'path';
import dotenv from 'dotenv';
import getConfig from '../config'; // Adjust the path to your getConfig file
import { ApiError } from '../../error/base-custom-error'; // Adjust the path to your ApiError file

// Mocking dotenv
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('getConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
    process.env = { ...originalEnv }; // Reset process.env to original values
  });

  afterAll(() => {
    process.env = originalEnv; // Restore the original environment
  });

  it('should throw an error if required environment variables are missing', () => {
    (dotenv.config as jest.Mock).mockReturnValue({ parsed: {} });

    const requiredConfig = ["NODE_ENV", "PORT", "MONGODB_URL", "LOG_LEVEL", "USER_SERVICE"];
    const missingConfig = requiredConfig.filter((key) => !process.env[key]);

    expect(() => getConfig('development')).toThrow(new ApiError(`Missing required environment variables: ${missingConfig.join(", ")}`));
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

    (dotenv.config as jest.Mock).mockReturnValue({ parsed: process.env });

    const config = getConfig('development');
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








