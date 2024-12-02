import winston from "winston";
import { logger, logInit, logDestroy } from "../logger"; // adjust the import path accordingly

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
  return {
    ...originalWinston,
    createLogger: jest.fn(() => mockLogger),
    transports: {
      Console: jest.fn(),
      File: jest.fn(),
    },
    format: originalWinston.format,
  };
});

describe("Logger initialization", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    logDestroy();
  });

  it("should add Console transport in non-testing environment", () => {
    logInit({ env: "development", logLevel: "info" });

    expect(logger.add).toHaveBeenCalledTimes(1);
    expect(winston.transports.Console).toHaveBeenCalledWith({
      level: "info",
      silent: false,
    });
  });

  it("should add both Console and File transports in production environment", () => {
    logInit({ env: "production", logLevel: "info" });

    expect(logger.add).toHaveBeenCalledTimes(2);
    expect(winston.transports.Console).toHaveBeenCalledWith({
      level: "info",
      silent: false,
    });
    expect(winston.transports.File).toHaveBeenCalledWith({
      level: "info",
      filename: expect.stringContaining("/logs/auth-service.log"),
    });
  });

  it("should not log to Console in testing environment", () => {
    logInit({ env: "testing", logLevel: "info" });

    
    expect(winston.transports.Console).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "info",
        silent: true, // Silent should be true in testing environment
      })
    );
  });

  it("should clear and close logger on destroy", () => {
    logInit({ env: "development", logLevel: "info" });
    logDestroy();

    expect(logger.clear).toHaveBeenCalled();
    expect(logger.close).toHaveBeenCalled();
  });
});
