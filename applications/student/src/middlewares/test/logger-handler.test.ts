import { Request, Response, NextFunction } from 'express';
import loggerMiddleware from '../logger-handler';
import { logger } from '../../utils/logger';
import onHeaders from 'on-headers';

// Mock the logger
jest.mock('../../utils/logger');
const mockLogger = logger as jest.Mocked<typeof logger>;

// Mock onHeaders
jest.mock('on-headers');
const mockOnHeaders = onHeaders as jest.MockedFunction<typeof onHeaders>;

describe('loggerMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      url: '/test',
      method: 'GET',
      body: { key: 'value' },
    };
    res = {
      statusCode: 200,  // Ensure statusCode is always a number
      on: jest.fn(),
    };
    next = jest.fn();

    // Clear mocks before each test
    mockLogger.debug.mockClear();
    mockLogger.info.mockClear();
    mockOnHeaders.mockClear();
  });

  it('should log request and response', () => {
    const started = new Date().getTime();
    // Call the middleware function
    loggerMiddleware(req as Request, res as Response, next);

    // Verify that logger.debug was called with the request information
    expect(mockLogger.debug).toHaveBeenCalledWith('request received: ', {
      url: '/test',
      method: 'GET',
      body: { key: 'value' },
    });

    // Simulate onHeaders callback with the correct this context
    const onHeadersCallback = mockOnHeaders.mock.calls[0][1];
    onHeadersCallback.call(res as Response);  // Cast res to Response

    // Verify that logger.info was called with the response information
    expect(mockLogger.info).toHaveBeenCalledWith('response sent', {
      url: '/test',
      method: 'GET',
      statusCode: 200,
      duration:  new Date().getTime() - started,
    });

    // Verify that next was called
    expect(next).toHaveBeenCalled();
  });
});
