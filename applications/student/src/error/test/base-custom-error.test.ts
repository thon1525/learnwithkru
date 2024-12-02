import StatusCode from "../../utils/http-status-code";
import { BaseCustomError, ApiError } from '../base-custom-error';

describe('BaseCustomError', () => {
  it('should set the message and status code', () => {
    const message = 'Test error message';
    const statusCode = 400;
    const error = new BaseCustomError(message, statusCode);

    expect(error.message).toBe(message);
    expect(error.statusCode).toBe(statusCode);
    expect(error.serializeErrors()).toEqual([{ message }]);
  });

  it('should set the correct prototype', () => {
    const error = new BaseCustomError('Test', 400);

    expect(error).toBeInstanceOf(BaseCustomError);
    expect(error).toBeInstanceOf(Error);
  });
});

describe('ApiError', () => {
  it('should set the message and default status code', () => {
    const message = 'API error message';
    const error = new ApiError(message);

    expect(error.message).toBe(message);
    expect(error.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);
    expect(error.serializeErrors()).toEqual([{ message }]);
  });

  it('should allow custom status code', () => {
    const message = 'Custom API error message';
    const statusCode = 401;
    const error = new ApiError(message, statusCode);

    expect(error.message).toBe(message);
    expect(error.statusCode).toBe(statusCode);
  });
});
