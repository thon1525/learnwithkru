"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_handler_1 = __importDefault(require("../logger-handler"));
const logger_1 = require("../../utils/logger");
const on_headers_1 = __importDefault(require("on-headers"));
// Mock the logger
jest.mock('../../utils/logger');
const mockLogger = logger_1.logger;
// Mock onHeaders
jest.mock('on-headers');
const mockOnHeaders = on_headers_1.default;
describe('loggerMiddleware', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
            url: '/test',
            method: 'GET',
            body: { key: 'value' },
        };
        res = {
            statusCode: 200, // Ensure statusCode is always a number
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
        (0, logger_handler_1.default)(req, res, next);
        // Verify that logger.debug was called with the request information
        expect(mockLogger.debug).toHaveBeenCalledWith('request received: ', {
            url: '/test',
            method: 'GET',
            body: { key: 'value' },
        });
        // Simulate onHeaders callback with the correct this context
        const onHeadersCallback = mockOnHeaders.mock.calls[0][1];
        onHeadersCallback.call(res); // Cast res to Response
        // Verify that logger.info was called with the response information
        expect(mockLogger.info).toHaveBeenCalledWith('response sent', {
            url: '/test',
            method: 'GET',
            statusCode: 200,
            duration: new Date().getTime() - started,
        });
        // Verify that next was called
        expect(next).toHaveBeenCalled();
    });
});
//# sourceMappingURL=logger-handler.test.js.map