"use strict";
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
const logger_1 = require("./utils/logger");
const app_1 = __importDefault(require("./app"));
const connection_1 = require("./queues/connection");
const email_sender_1 = __importDefault(require("./utils/email-sender"));
const nodemailer_email_api_1 = __importDefault(require("./utils/nodemailer-email-api"));
const config_1 = __importDefault(require("./utils/config"));
const socket_sender_1 = require("./utils/socket-sender");
const socket_notification_api_1 = require("./utils/socket-notification-api");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // currect envaironment
            const currentEnv = process.env.NODE_ENV || 'development';
            const config = (0, config_1.default)(currentEnv);
            // Initialize Logger
            (0, logger_1.logInit)({ env: process.env.NODE_ENV, logLevel: config.logLevel });
            // start socket server
            const socketSender = socket_sender_1.SocketSender.getInstance();
            socketSender.activate();
            socketSender.sendSocketApi(new socket_notification_api_1.SocketNotificationEmailApi());
            // Activate Email Sender with Nodemailer API
            const emailSender = email_sender_1.default.getInstance();
            emailSender.activate();
            emailSender.setEmailApi(new nodemailer_email_api_1.default());
            // Start the Queue System (RabbitMQ)
            yield (0, connection_1.startQueue)();
            logger_1.logger.info('RabbitMQ queue system started successfully.');
            logger_1.logger.info(`Worker with process ID ${process.pid} on notification server has started.`);
            // Start the Notification Server
            const server = app_1.default.listen(config.port, () => {
                logger_1.logger.info(`Notification Server is listening on port: ${config.port}`);
            });
            const exitHandler = () => __awaiter(this, void 0, void 0, function* () {
                if (server) {
                    server.close(() => {
                        logger_1.logger.info('Server closed!');
                        process.exit(1); // Exit process due to error
                    });
                }
                else {
                    process.exit(1);
                }
            });
            const unexpectedErrorHandler = (error) => {
                logger_1.logger.error(`Unhandled error: ${error}`);
                exitHandler();
            };
            // Handle uncaught exceptions and unhandled promise rejections
            process.on('uncaughtException', unexpectedErrorHandler); // Synchronous errors
            process.on('unhandledRejection', unexpectedErrorHandler); // Asynchronous errors
            // Handle termination signals (e.g., from Docker or Kubernetes)
            process.on('SIGTERM', () => {
                logger_1.logger.info('SIGTERM received');
                if (server) {
                    server.close(() => {
                        logger_1.logger.info('Stopped accepting new requests');
                    });
                }
            });
        }
        catch (error) {
            logger_1.logger.error(`Failed to initialize application: ${error}`);
            process.exit(1);
        }
    });
}
// Only run
if (process.env.NODE_ENV !== 'testing') {
    run();
}
//# sourceMappingURL=server.js.map