

import { Request, Response, NextFunction } from 'express';
import { Schema, z } from 'zod';
import { studentValidate } from '../student-validate';
import { BaseCustomError, ApiError } from '../../error/base-custom-error';
import StatusCode from '../../utils/http-status-code';

// Mock request, response, and next function
const mockRequest = (body: any): Request => ({
  body,
} as Request);

const mockResponse = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

type NextFunctionMock = jest.MockedFunction<NextFunction>;

const mockNext = (): NextFunctionMock => jest.fn() as NextFunctionMock;

describe('studentValidate middleware', () => {
  const schema = z.object({
    name: z.string().nonempty("Name is required"),
    age: z.number().int().positive("Age must be a positive integer"),
  });

  it('should call next() if the validation passes', async () => {
    const req = mockRequest({ name: 'John Doe', age: 25 });
    const res = mockResponse();
    const next = mockNext();

    await studentValidate(schema)(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.any(Error));
  });

  it('should call next() with BaseCustomError if validation fails', async () => {
    const req = mockRequest({ name: '', age: -5 });
    const res = mockResponse();
    const next = mockNext();

    await studentValidate(schema)(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(BaseCustomError));
    const error = next.mock.calls[0][0] as unknown as BaseCustomError;
    expect(error.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    expect(error.message).toContain('name is Name is required');
    expect(error.message).toContain('age is Age must be a positive integer');
  });

  it('should call next() with BaseCustomError if name is empty and age is null', async () => {
    const req = mockRequest({ name: '', age: null });
    const res = mockResponse();
    const next = mockNext();

    await studentValidate(schema)(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(BaseCustomError));
    const error = next.mock.calls[0][0] as unknown as BaseCustomError;
    expect(error.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    expect(error.message).toContain('name is Name is required');
    expect(error.message).toContain('age is Expected number');
  });

  it('should call next() with ApiError if an unknown error occurs', async () => {
    // Mock schema.parse to throw an unknown error
    const req = mockRequest({ name: 'John Doe', age: 25 });
    const res = mockResponse();
    const next = mockNext();

    const errorThrowingSchema = {
      parse: () => { throw new ApiError('Unknown error'); }
    } as unknown as Schema;

    await studentValidate(errorThrowingSchema)(req, res, next);
    const error = next.mock.calls[0][0] as unknown as ApiError;
    expect(error.message).toBe("Something went wrong!");
  });
});
