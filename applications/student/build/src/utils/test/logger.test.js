"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger_1 = require("../logger"); // adjust the import path accordingly
jest.mock("winston", () => {
    const originalWinston = jest.requireActual("winston");
    const mockLogger = {
        add: jest.fn(),
        clear: jest.fn(),
        close: jest.fn(),
        log: jest.fn(),
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
    };
    return Object.assign(Object.assign({}, originalWinston), { createLogger: jest.fn(() => mockLogger), transports: {
            Console: jest.fn(),
            File: jest.fn(),
        }, format: originalWinston.format });
});
describe("Logger initialization", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        (0, logger_1.logDestroy)();
    });
    it("should add Console transport in non-testing environment", () => {
        (0, logger_1.logInit)({ env: "development", logLevel: "info" });
        expect(logger_1.logger.add).toHaveBeenCalledTimes(1);
        expect(winston_1.default.transports.Console).toHaveBeenCalledWith({
            level: "info",
            silent: false,
        });
    });
    it("should add both Console and File transports in production environment", () => {
        (0, logger_1.logInit)({ env: "production", logLevel: "info" });
        expect(logger_1.logger.add).toHaveBeenCalledTimes(2);
        expect(winston_1.default.transports.Console).toHaveBeenCalledWith({
            level: "info",
            silent: false,
        });
        expect(winston_1.default.transports.File).toHaveBeenCalledWith({
            level: "info",
            filename: expect.stringContaining("/logs/auth-service.log"),
        });
    });
    it("should not log to Console in testing environment", () => {
        (0, logger_1.logInit)({ env: "testing", logLevel: "info" });
        expect(winston_1.default.transports.Console).toHaveBeenCalledWith(expect.objectContaining({
            level: "info",
            silent: true, // Silent should be true in testing environment
        }));
    });
    it("should clear and close logger on destroy", () => {
        (0, logger_1.logInit)({ env: "development", logLevel: "info" });
        (0, logger_1.logDestroy)();
        expect(logger_1.logger.clear).toHaveBeenCalled();
        expect(logger_1.logger.close).toHaveBeenCalled();
    });
});
//# sourceMappingURL=logger.test.js.map