"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicKey = void 0;
const logger_1 = require("./utils/logger");
const app_1 = __importDefault(require("./app"));
const createConfig_1 = __importDefault(require("./utils/createConfig"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// READ FILE JWT PUBLIC KEY FIRST
exports.publicKey = fs.readFileSync(path.join(__dirname, "../public_key.pem"), "utf-8");
// RUN THE SERVER GATEWAY
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentEnv = process.env.NODE_ENV || "development";
            const config = (0, createConfig_1.default)(currentEnv);
            // Activate Logger
            (0, logger_1.logInit)({ env: process.env.NODE_ENV, logLevel: config.logLevel });
            // Start Server
            logger_1.logger.info(`Gateway server has started with process id ${process.pid}`);
            const server = app_1.default.listen(config.port, () => {
                logger_1.logger.info(`Gateway server is listening on port: ${config.port}`);
            });
            const exitHandler = () => __awaiter(this, void 0, void 0, function* () {
                if (server) {
                    server.close(() => __awaiter(this, void 0, void 0, function* () {
                        logger_1.logger.info("server closed!");
                        logger_1.logger.info("mongodb disconnected!");
                        // Gracefully Terminate
                        process.exit(1); // terminate the process due to error
                    }));
                }
                else {
                    process.exit(1);
                }
            });
            const unexpectedErrorHandler = (error) => {
                logger_1.logger.error("unhandled error", { error });
                exitHandler();
            };
            // Error that might occur duing execution that not caught by any try/catch blocks
            process.on("uncaughtException", unexpectedErrorHandler); // Syncronous
            process.on("unhandledRejection", unexpectedErrorHandler); // Asyncronous
            // A termination signal typically sent from OS or other software (DOCKER, KUBERNETES)
            process.on("SIGTERM", () => {
                logger_1.logger.info("SIGTERM received");
                if (server) {
                    // Stop the server from accepting new request but keeps existing connection open until all ongoin request are done
                    server.close();
                }
            });
        }
        catch (error) {
            logger_1.logger.error("Gateway Service Failed", { error });
            process.exit(1);
        }
    });
}
// start the api-gateway server
run();
//# sourceMappingURL=server.js.map