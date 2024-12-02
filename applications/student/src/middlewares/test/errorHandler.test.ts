// middlewares/__tests__/error-handler.test.ts
import { Request, Response, NextFunction } from 'express';
import { BaseCustomError } from '../../error/base-custom-error';
import { errorHandler } from '../errorsHandler';

describe('errorHandler Middleware', () => {
    it('should handle BaseCustomError correctly', async () => {
        // Mock request, response, and next function
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        // Create an instance of BaseCustomError
        const error = new BaseCustomError('Test error message', 400);

        // Call the errorHandler middleware
        await errorHandler(error, req, res, next);

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
    });

    it('should call next middleware if error is not BaseCustomError', async () => {
        // Mock request, response, and next function
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        // Create a generic error
        const error = new Error('Generic error');

        // Call the errorHandler middleware
        await errorHandler(error, req, res, next);

        // Assertions
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });
});



