import { generateSignature, decodedToken } from '../jwt';
import jwt from 'jsonwebtoken';
import { BaseCustomError } from '../../error/base-custom-error';
import path from 'path';
import fs from 'fs'
import StatusCode from '../http-status-code';
import getConfig from "../config";

// Mock the dependencies
const config = getConfig()
jest.mock('jsonwebtoken');
const privateKeyPath = path.join(__dirname, "../../../private_key.pem");
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
describe('auth utils', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateSignature', () => {
    it('should generate a valid token', async () => {
      const mockId = '12345';
      const mockToken = 'mockToken';

      (jwt.sign as jest.Mock).mockImplementation(() => {
        return mockToken;
      });

      const token = await generateSignature({ _id: mockId });

      expect(jwt.sign).toHaveBeenCalledWith(
        { payload: { id: mockId, role: 'student' } },
        privateKey,
        { expiresIn: config.jwtExpiresIn!, algorithm: 'RS256' }
      );
      expect(token).toBe(mockToken);
    });

    it('should throw a custom error when jwt.sign fails', async () => {
      const mockId = '12345';
      const mockError = new BaseCustomError('Unknown error occurred', StatusCode.NOT_ACCEPTABLE);

      (jwt.sign as jest.Mock).mockImplementation(() => {
        throw mockError;
      });

      await expect(generateSignature({ _id: mockId })).rejects.toThrow(BaseCustomError);
    });
  });

  describe('decodedToken', () => {
    it('should decode a token and return the payload', async () => {
      const mockToken = 'mockToken';
      const mockPayload = { payload: { id: '12345', role: 'student' } };

      (jwt.decode as jest.Mock).mockReturnValue(mockPayload);

      const payload = await decodedToken(mockToken);

      expect(jwt.decode).toHaveBeenCalledWith(mockToken);
      expect(payload).toEqual(mockPayload.payload);
    });

    it('should throw an error when jwt.decode fails', async () => {
      const mockToken = 'mockToken';
      (jwt.decode as jest.Mock).mockImplementation(() => {
        throw new BaseCustomError('Mock decode error',  StatusCode.NOT_ACCEPTABLE);
      });

      await expect(decodedToken(mockToken)).rejects.toThrow('Mock decode error');
    });
  });
});








